const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const jwtConfig = require('../utils/jwt');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not provided!' });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, jwtConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token!' });
  }
};