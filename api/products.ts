import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from '../lib/mongodb';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const db = await getDb();
    const col = db.collection('products');

    if (req.method === 'GET') {
      const products = await col.find({}, { projection: { _id: 0 } }).toArray();
      return res.status(200).json(products);
    }

    if (req.method === 'POST') {
      const product = req.body;
      await col.insertOne(product);
      return res.status(201).json(product);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return res.status(500).json({ error: message });
  }
}
