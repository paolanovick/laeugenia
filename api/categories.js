const { getDb } = require('./_mongodb');

const DEFAULT_CATEGORIES = [
  { id: 'mates', name: 'Mates', icon: '🧉', hidden: false },
  { id: 'yerba', name: 'Yerba & Blends', icon: '🌿', hidden: false },
  { id: 'bombillas', name: 'Bombillas', icon: '✨', hidden: false },
  { id: 'articulos', name: 'Artículos Materos', icon: '🪔', hidden: false },
  { id: 'combos', name: 'Combos y Regalos', icon: '🎁', hidden: false },
  { id: 'publicidad', name: 'Publicidad', icon: '📢', hidden: true },
];

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const db = await getDb();
    const col = db.collection('categories');

    if (req.method === 'GET') {
      let categories = await col.find({}, { projection: { _id: 0 } }).toArray();
      if (categories.length === 0) {
        await col.insertMany(DEFAULT_CATEGORIES);
        categories = DEFAULT_CATEGORIES;
      }
      return res.status(200).json(categories);
    }

    if (req.method === 'POST') {
      const category = req.body;
      await col.replaceOne({ id: category.id }, category, { upsert: true });
      return res.status(200).json(category);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
