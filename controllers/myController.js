// Dependencies
const express = require('express');
const User = require('../models/user.js');

// Configuration
const myRouter = express.Router();

// INDEX ROUTE
myRouter.get('/', async (req, res) => {
  const query = await User.find({}).catch((err) =>
    res.status(400).json({ error: err.message })
  );
  res.status(200).json(query);
});

// CREATE ROUTE
myRouter.post('/', async (req, res) => {
  const query = await User.create(req.body).catch((err) =>
    res.status(400).json({ error: err.message })
  );
  res.status(200).json(query);
});

// UPDATE ROUTE (user profile)
myRouter.put('/:id', async (req, res) => {
  const query = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).catch((err) => res.status(400).json({ error: err.message }));
  res.status(200).json(query);
});

// UPDATE ROUTE (in game attack)
myRouter.put('/:userID/:target', async (req, res) => {
  const query = await User.findByIdAndUpdate(req.params.userID, req.body, {
    new: true,
  }).catch((err) => res.status(400).json({ error: err.message }));
  res.status(200).json(query);
});

// DELETE ROUTE
myRouter.delete('/:id', async (req, res) => {
  const query = await User.findByIdAndRemove(req.params.id).catch((err) =>
    res.status(400).json({ error: err.message })
  );
  res.status(200).json(query);
});

// Router export
module.exports = myRouter;
