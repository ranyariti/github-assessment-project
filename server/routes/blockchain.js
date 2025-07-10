const express = require('express');
const router = express.Router();
const { getChain } = require('../blockchain');

router.get('/blockchain', (req, res) => {
  res.json(getChain());
});

module.exports = router;
