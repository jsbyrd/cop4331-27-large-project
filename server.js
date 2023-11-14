// Import libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;

const app = express();

// Server static assets if in production
if (process.env.NODE_ENV === 'production')
{
  // Set static folder
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) =>
  {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

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

// Use middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Import api endpoints
const usersRouter = require("./api/users");
const quizzesRouter = require("./api/quizzes");
const questionsRouter = require("./api/questions");
const answersRouter = require("./api/answers");
const savedRouter = require("./api/saved");
const cookiesRouter = require("./api/cookies");

// Use routes
app.use("/api/users", usersRouter);
app.use("/api/quizzes", quizzesRouter);
app.use("/api/questions", questionsRouter);
app.use("/api/answers", answersRouter);
app.use("/api/saved", savedRouter);
app.use("/api/cookie", cookiesRouter);

// Start server
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});