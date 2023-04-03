const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require("../config/development.json");

const {jwtSecretKey} = config;

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = new User({
      email: email,
      password: await bcrypt.hash(password, 10)
    });

    await user.save();
    res.status(200).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const token = jwt.sign({ userId: user._id }, jwtSecretKey);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
