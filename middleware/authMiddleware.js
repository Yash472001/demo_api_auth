const jwt = require('jsonwebtoken');
const config = require('../config/development.json');
const {jwtSecretKey} = config;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, jwtSecretKey);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    console.log("Error : ",err);
    res.status(401).json({ message: 'Authentication failed , Please Login again.' });
  }
};
