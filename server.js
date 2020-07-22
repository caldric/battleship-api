// Dependencies
// Packages
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
// Controllers
const myController = require('./controllers/myController.js');

// Configuration
const local = {
  port: 8080,
  mongoURI: 'mongodb://localhost:27017/data',
  clientURL: 'http://localhost:3000',
};
const deployment = {
  port: process.env.PORT,
  mongoURI: process.env.MONGODB_URI,
  url: 'https://gentle-temple-22561.herokuapp.com',
};
const index = 'index';
const app = express();
const PORT = deployment.port || local.port;
const MONGODB_URI = deployment.mongoURI || local.mongoURI;

// Connect to MongoDB via Mongoose
mongoose.connection.on('error', (error) =>
  console.log(`${error.message} is Mongo not running?`)
);
mongoose.connection.on('disconnected', () => console.log('Mongo disconnected'));
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('Connected to Mongoose');
});

// CORS config
const whitelist = [local.clientURL, deployment.url];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Controllers
app.use(`/${index}`, myController);

// Listener
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
