import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from '../lib/mongodb';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const db = await getDb();
    const count = await db.collection('products').countDocuments();
    return res.status(200).json({ ok: true, products: count });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return res.status(500).json({ ok: false, error: message });
  }
}
