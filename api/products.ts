import type { VercelRequest, VercelResponse } from '@vercel/node';
import clientPromise from '../lib/mongodb';

const DB = 'laeugenia';
const COL = 'products';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const client = await clientPromise;
  const col = client.db(DB).collection(COL);

  if (req.method === 'GET') {
    const products = await col.find({}).toArray();
    return res.status(200).json(products);
  }

  if (req.method === 'POST') {
    const product = req.body;
    await col.insertOne(product);
    return res.status(201).json(product);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
