// Dependency
const mongoose = require('mongoose');

// Schema
const mySchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  age: { type: Number, min: [1, 'Invalid age'], max: [150, 'Invalid age'] },
  admin: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
  tags: [{ type: String }],
});

// Model export
module.exports = mongoose.model('MyModel', mySchema);
