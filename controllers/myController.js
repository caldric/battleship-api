// Dependencies
const express = require('express');
const User = require('../models/user.js');

// Configuration
const myRouter = express.Router();

// Index route for a specific game
myRouter.get('/games/:id', async (req, res) => {
  const query = await Game.findById(req.params.id).catch((err) =>
    res.status(400).json({ error: err.message })
  );
  res.status(200).json(query);
});

/**************************************************************
************************* INDEX ROUTE ************************

curl http://localhost:8080/battleship/allusers
**************************************************************/
myRouter.get('/allusers', async (req, res) => {
  const query = await User.find({}).catch((err) =>
    res.status(400).json({ error: err.message })
  );
  res.status(200).json(query);
});

/**************************************************************
****************** CREATE ROUTE (user profile) ****************

curl -X POST -H "Content-Type: application/json" -d '{"username":"player2", "password":"123456", "totalGames":2}' http://localhost:8080/battleship/create/user
**************************************************************/
myRouter.post('/create/user', async (req, res) => {
  const query = await User.create(req.body).catch((err) =>
    res.status(400).json({ error: err.message })
  );
  res.status(200).json(query);
});

/**************************************************************
****************** CREATE ROUTE (game board) ******************

curl -X POST -H "Content-Type: application/json" -d '{"enemyID":"5f1a4be8eeefb5357bc85907"}' http://localhost:8080/battleship/create/game
**************************************************************/
// CHECK
myRouter.post('/create/game', async (req, res) => {
  const query = await User.create(req.body).catch((err) =>
    res.status(400).json({ error: err.message })
  );
  res.status(200).json(query);
});

/**************************************************************
****************** UPDATE ROUTE (user profile) ****************

curl -X PUT -H "Content-Type: application/json" -d '{"username":"newplayer1"}' http://localhost:8080/battleship/5f1a445e54c6e0343996b7b0
**************************************************************/
myRouter.put('/:id', async (req, res) => {
  const query = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).catch((err) => res.status(400).json({ error: err.message }));
  res.status(200).json(query);
});

/**************************************************************
****************** UPDATE ROUTE (game attack) *****************

curl -X PUT -H "Content-Type: application/json" -d '{"userID2":"5f19f67d183313098fb0b60b"}' http://localhost:8080/battleship/5f19da7d5b135d7ac7772b95/A10
curl -X PUT -H "Content-Type: application/json" -d '{"carrier":3}' http://localhost:8080/battleship/5f1a4961c4ac383511f595b6/A10
**************************************************************/
myRouter.put('/:gameID/:target', async (req, res) => {
  const targetCol = req.params.target.slice(0, 1);
  const targetRow = req.params.target.slice(1);
  const objTarget = `enemyBoard.${targetCol}.${targetRow}`;

  const update = {
    [objTarget]: 'attack',
  };

  const options = {
    new: true,
  };

  const query = await User.findByIdAndUpdate(
    req.params.gameID,
    update,
    options
  ).catch((err) => res.status(400).json({ error: err.message }));

  // CHECK
  res.status(200).json({ col: targetCol, row: targetRow, query: query });
  res.status(200).json(query);
});

/**************************************************************
************************* DELETE ROUTE ************************

curl -X DELETE http://localhost:8080/battleship/5f1a445e54c6e0343996b7b0
**************************************************************/
myRouter.delete('/:id', async (req, res) => {
  const query = await User.findByIdAndRemove(req.params.id).catch((err) =>
    res.status(400).json({ error: err.message })
  );
  res.status(200).json(query);
});

// Router export
module.exports = myRouter;
