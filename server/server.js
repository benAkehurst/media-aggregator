// Server Dependencies
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Models Imports
const User = require('./api/models/userModel');
const Task = require('./api/models/todoListModel');
const NewsClipping = require('./api/models/newsClippingModel');

// Init Express
const app = express();
require('dotenv').config();

// Server Port Controls
const port = process.env.PORT || 8080;
app.set('port', port);

// DB Connection
mongoose
  .connect(
    process.env.DB_URL,
    () => {
      console.log(`Connected to MongoDB Successfully`);
    },
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .catch((err) => {
    console.log(err);
  });

// Server Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors Controls
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, PATCH, DELETE, OPTIONS'
  );
  next();
});
app.use(cors());

// Routes Definitions
const userRoutes = require('./api/routes/userRoutes');
const taskRoutes = require('./api/routes/todoListRoutes');
const scraperRoutes = require('./api/routes/scraperRoutes');
const readerRoutes = require('./api/routes/readerRoutes');
userRoutes(app);
taskRoutes(app);
scraperRoutes(app);
readerRoutes(app);

const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));
