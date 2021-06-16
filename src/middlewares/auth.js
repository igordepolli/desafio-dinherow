const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const jwtConfig = require('../utils/jwt');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Token not provided!' });
    }
    const [, token] = req.headers.authorization.split(' ');

    const decoded = await promisify(jwt.verify)(token, jwtConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token!' });
  }
};