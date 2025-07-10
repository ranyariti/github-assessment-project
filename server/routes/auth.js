// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();


router.post('/register', async (req, res) => {
  const { email, password } = req.body;


  if (!email || !password || password.length < 6) {
    return res.status(400).json({ msg: 'Invalid email or password' });
  }

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: 'Email already registered' });


    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);


    const newUser = new User({ email, password: hashed });
    await newUser.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

   
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({
      token,
      user: { id: user._id, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
