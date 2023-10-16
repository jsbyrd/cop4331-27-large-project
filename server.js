// Import libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

app.set('port', (process.env.PORT || 5000));
app.use((req, res, next) =>
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
  'Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
  'Access-Control-Allow-Methods',
  'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

// Import api endpoints
const usersRouter = require("./controllers/users");

// Use middleware
app.use(cors());
app.use(bodyParser.json());
// Use routes
app.use("/api/users", usersRouter);

// Start server
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});