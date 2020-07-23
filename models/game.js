// Dependency
const mongoose = require('mongoose');

// Schema
const gameSchema = new mongoose.Schema({
  userID1: { type: String, required: true, unique: true },
  userID2: { type: String, required: false, unique: true },
  carrier: { type: Number, default: 5, min: [0, 'Invalid number'] },
  battleship: { type: Number, default: 4, min: [0, 'Invalid number'] },
  cruiser: { type: Number, default: 3, min: [0, 'Invalid number'] },
  submarine: { type: Number, default: 3, min: [0, 'Invalid number'] },
  destroyer: { type: Number, default: 2, min: [0, 'Invalid number'] },
  yourBoard: {
    A: {
      1: { type: Number, default: 0 },
    },
  },
  enemyBoard: [[{ type: String }]],
});

// Model export
module.exports = mongoose.model('Game', gameSchema);
