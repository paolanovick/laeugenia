module.exports = function handler(req, res) {
  res.status(200).json({ pong: true, env: !!process.env.MONGODB_URI });
};
