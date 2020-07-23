// Dependency
const mongoose = require('mongoose');

// Schema
const shipsSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  carrier: { type: Number, default: 5, min: [0, 'Invalid number'] },
  battleship: { type: Number, default: 4, min: [0, 'Invalid number'] },
  cruiser: { type: Number, default: 3, min: [0, 'Invalid number'] },
  submarine: { type: Number, default: 3, min: [0, 'Invalid number'] },
  destroyer: { type: Number, default: 2, min: [0, 'Invalid number'] },
});

// Model export
module.exports = mongoose.model('Ships', shipsSchema);
