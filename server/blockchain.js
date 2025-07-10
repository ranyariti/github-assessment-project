const crypto = require('crypto');

const blockchain = [];

function calculateHash(message) {
  return crypto.createHash('sha256').update(message).digest('hex');
}

function addBlock(message) {
  const index = blockchain.length;
  const timestamp = new Date().toISOString();
  const messageHash = calculateHash(message);
  const previousHash = index > 0 ? blockchain[index - 1].hash : '0';
  const block = {
    index,
    timestamp,
    messageHash,
    previousHash,
    hash: calculateHash(index + timestamp + messageHash + previousHash),
  };
  blockchain.push(block);
}

function getChain() {
  return blockchain;
}

module.exports = { addBlock, getChain };
