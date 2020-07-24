const bcrypt = require('bcrypt');
const express = require('express');

const User = require('../models/user.js');

const loginController = express.Router();

// on session log in
loginController.post('/', async (req, res) => {
  // find User (error)
  const user = await User.findOne({ username: req.body.username }).catch(
    (err) => {
      res.status(400).json({ error: err.message });
    }
  );

  // if User is found, look for password and match it
  const passwordMatches = user
    ? bcrypt.compareSync(req.body.password, user.password)
    : false;

  // store User on session
  if (user && passwordMatches) {
    req.session.user = user;
    res.status(200).json({ user });
  } else {
    res.status(400).json({ error: 'Invalid username or password' });
  }
});
