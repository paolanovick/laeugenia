import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from '../../lib/mongodb';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const id = req.query.id as string;
    const db = await getDb();
    const col = db.collection('products');

    if (req.method === 'PUT') {
      const { _id, ...data } = req.body;
      await col.replaceOne({ id }, { id, ...data }, { upsert: true });
      return res.status(200).json({ id, ...data });
    }

    if (req.method === 'DELETE') {
      await col.deleteOne({ id });
      return res.status(200).json({ deleted: id });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return res.status(500).json({ error: message });
  }
}
