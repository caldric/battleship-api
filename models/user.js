// Dependency
const mongoose = require('mongoose');

// Schema
const User = new mongoose.Schema({
  username: { type: String, required: true, unique: false },
  totalGames: { type: Number, default: 0, min: [0, 'Invalid number'] },
  wins: { type: Number, default: 0, min: [0, 'Invalid number'] },
  inGame: { type: Boolean, default: false },
});

// Model export
module.exports = mongoose.model('MyModel', User);
