// Dependencies
const express = require('express');
const User = require('../models/user.js');
const Game = require('../models/game.js');

// Configuration
const myRouter = express.Router();

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
************************* INDEX ROUTE ************************

curl http://localhost:8080/battleship/allgames
**************************************************************/
myRouter.get('/allgames', async (req, res) => {
  const query = await Game.find({}).catch((err) =>
    res.status(400).json({ error: err.message })
  );
  res.status(200).json(query);
});

/**************************************************************
****************** CREATE ROUTE (user profile) ****************

curl -X POST -H "Content-Type: application/json" -d '{"username":"player1", "password":"123456", "totalGames":2}' http://localhost:8080/battleship/create/user
**************************************************************/
myRouter.post('/create/user', async (req, res) => {
  const query = await User.create(req.body).catch((err) =>
    res.status(400).json({ error: err.message })
  );
  res.status(200).json(query);
});

/**************************************************************
****************** CREATE ROUTE (game board) ******************

curl -X POST -H "Content-Type: application/json" -d '{"userID1":"5f19d95b6766db795448d1fb"}' http://localhost:8080/battleship/create/game
**************************************************************/
myRouter.post('/create/game', async (req, res) => {
  const query = await Game.create(req.body).catch((err) =>
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

curl -X PUT -H "Content-Type: application/json" -d '{"carrier":6}' http://localhost:8080/battleship/5f19da7d5b135d7ac7772b95/A10
**************************************************************/
myRouter.put('/:gameID/:target', async (req, res) => {
  console.log(`req.body`, req.body);
  res.status(200).json(req.params.gameID);
  const query = await Game.findByIdAndUpdate(
    req.params.gameID,
    req.body
  ).catch((err) => res.status(400).json({ error: err.message }));
  const data = await query.json();

  res.status(200).json(data);

  // const query = await Game.findByIdAndUpdate(req.params.gameID, req.body, {
  //   new: true,
  // })
  //   .then((err, updatedGame) => {
  //     console.log(`updatedGame`, updatedGame);
  //     return;
  //   })
  //   .catch((err) => res.status(400).json({ error: err.message }));
  // res.status(200).json(query);
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
