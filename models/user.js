// Dependency
const mongoose = require('mongoose');

// Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: false },
  password: { type: String, required: false }, //not required because of anonymous users
  totalGames: { type: Number, default: 0, min: [0, 'Invalid number'] },
  wins: { type: Number, default: 0, min: [0, 'Invalid number'] },
  inGame: { type: Boolean, default: false },
  yourBoard: [[{ type: String }]],
  enemyBoard: [[{ type: String }]],
});

// Model export
module.exports = mongoose.model('User', userSchema);
