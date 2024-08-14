const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

exports.loginUser = [
  check('username').not().isEmpty(),
  check('password').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user || !(await user.isPasswordMatch(password))) {
        return res.status(400).send({ error: 'Invalid login credentials' });
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.send({ user, token });
    } catch (error) {
      res.status(500).send(error);
    }
  }
];

exports.registerUser = [
  check('username').not().isEmpty(),
  check('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = new User(req.body);
      await user.save();
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).send({ user, token });
    } catch (error) {
      res.status(400).send(error);
    }
  }
];

exports.getUserProfile = async (req, res) => {
  res.send(req.user);
};

exports.logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};
