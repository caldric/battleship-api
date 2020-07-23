// Dependencies
const express = require('express');
const User = require('../models/user.js');
const Game = require('../models/game.js');

// Configuration
const myRouter = express.Router();

/**************************************************************
************************* INDEX ROUTE ************************

curl http://localhost:8080/battleship
**************************************************************/
myRouter.get('/', async (req, res) => {
  const query = await User.find({}).catch((err) =>
    res.status(400).json({ error: err.message })
  );
  res.status(200).json(query);
});

/**************************************************************
************************* CREATE ROUTE ************************

curl -X POST -H "Content-Type: application/json" -d '{"username":"player1", "password":"123456", "totalGames":2}' http://localhost:8080/battleship
**************************************************************/
myRouter.post('/', async (req, res) => {
  const query = await User.create(req.body).catch((err) =>
    res.status(400).json({ error: err.message })
  );
  res.status(200).json(query);
});

/**************************************************************
****************** UPDATE ROUTE (user profile) ****************

curl -X PUT -H "Content-Type: application/json" -d '{"username":"newplayer1"}' http://localhost:8080/battleship/5f19b71b48b07f6381b2593c
**************************************************************/
myRouter.put('/:id', async (req, res) => {
  const query = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).catch((err) => res.status(400).json({ error: err.message }));
  res.status(200).json(query);
});

/**************************************************************
****************** UPDATE ROUTE (game attack) *****************

curl -X PUT -H "Content-Type: application/json" -d '{"username":"newplayer1"}' http://localhost:8080/battleship/5f19b71b48b07f6381b2593c
**************************************************************/
myRouter.put('/:userID/:target', async (req, res) => {
  const query = await User.findByIdAndUpdate(req.params.userID, req.body, {
    new: true,
  }).catch((err) => res.status(400).json({ error: err.message }));
  res.status(200).json(query);
});

/**************************************************************
************************* DELETE ROUTE ************************

curl -X DELETE http://localhost:8080/battleship/5f17390cec2fe10ed80ed3a7
**************************************************************/
myRouter.delete('/:id', async (req, res) => {
  const query = await User.findByIdAndRemove(req.params.id).catch((err) =>
    res.status(400).json({ error: err.message })
  );
  res.status(200).json(query);
});

// Router export
module.exports = myRouter;
