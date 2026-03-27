import type { VercelRequest, VercelResponse } from '@vercel/node';
import clientPromise from '../../lib/mongodb';

const DB = 'laeugenia';
const COL = 'products';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id } = req.query as { id: string };
  const client = await clientPromise;
  const col = client.db(DB).collection(COL);

  if (req.method === 'PUT') {
    const { _id, ...data } = req.body;
    await col.replaceOne({ id }, { id, ...data });
    return res.status(200).json({ id, ...data });
  }

  if (req.method === 'DELETE') {
    await col.deleteOne({ id });
    return res.status(200).json({ deleted: id });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
