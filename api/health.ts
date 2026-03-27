import type { VercelRequest, VercelResponse } from '@vercel/node';
import clientPromise from '../lib/mongodb';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('laeugenia');
    const count = await db.collection('products').countDocuments();
    return res.status(200).json({ ok: true, products: count });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return res.status(500).json({ ok: false, error: message });
  }
}
