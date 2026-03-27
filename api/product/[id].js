const { getDb } = require('../_mongodb');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const id = req.query.id;
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
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
