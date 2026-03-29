const { getDb } = require('./_mongodb');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const db = await getDb();
    const col = db.collection('page_config');

    if (req.method === 'GET') {
      const doc = await col.findOne({ _id: 'main' }, { projection: { _id: 0 } });
      return res.status(200).json(doc || {});
    }

    if (req.method === 'POST') {
      const config = req.body;
      await col.replaceOne({ _id: 'main' }, { _id: 'main', ...config }, { upsert: true });
      return res.status(200).json(config);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
