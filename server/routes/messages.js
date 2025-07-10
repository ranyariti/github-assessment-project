// server/routes/messages.js
const express = require('express');
const Message = require('../models/Message');
const auth = require('../middleware/authMiddleware');
const router = express.Router();
const { addBlock } = require('../blockchain');  


// Submit a message (protected)
router.post('/', auth, async (req, res) => {
  const { content } = req.body;

  if (!content || content.length > 250) {
    return res.status(400).json({ msg: 'Message is empty or too long.' });
  }

  try {
    const newMsg = new Message({
      content,
      user: req.user.id
    });
    await newMsg.save();         
    addBlock(content); 
    res.status(201).json(newMsg);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


router.get('/my', auth, async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


router.get('/all', async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('user', 'email')
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
