// Import libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Mailjet = require('node-mailjet');
const path = require('path');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const mjApiKeyPublic = '0243deaf5db270912f61728ef0695174';
const mjApiKeyPrivate = '2dcefb5ab09f75c61951857734523712';

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

const mailjet = Mailjet.apiConnect(
  mjApiKeyPublic,
  mjApiKeyPrivate
);

app.post('/send-email', async (req, res) => {
  const { recipientEmail } = req.body;
  const { verifyLink } = req.body;
  const templateId = 5324155;
  console.log(verifyLink);
  try {
    const result = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: "quizwizzes@gmail.com",
            Name: "QuizWiz"
          },
          To: [
            {
              Email: recipientEmail,
              Name: "You"
            }
          ],
          Subject: "Email Verification",
          TextPart: "Click the link below to verify your email.",
          HTMLPart: verifyLink
        }
      ]
    });
    console.log(result.body);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error sending email:", error.statusCode, error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/reset-pass', async (req, res) => {
  const { recipientEmail } = req.body;
  const { resetLink } = req.body;
  const templateId = 5324155;
  console.log(recipientEmail);
  try {
    const result = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: "quizwizzes@gmail.com",
            Name: "QuizWiz"
          },
          To: [
            {
              Email: recipientEmail,
              Name: "You"
            }
          ],
          Subject: "Reset Password",
          TextPart: "Click the link below to reset your password.",
          HTMLPart: resetLink
        }
      ]
    });
    console.log(result.body);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error sending email:", error.statusCode, error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

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