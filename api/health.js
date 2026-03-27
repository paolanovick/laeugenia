const { getDb } = require('./_mongodb');

module.exports = async function handler(req, res) {
  try {
    const db = await getDb();
    const count = await db.collection('products').countDocuments();
    return res.status(200).json({ ok: true, products: count });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
