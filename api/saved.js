const savedRouter = require("express").Router();
require("dotenv").config();
const token = require("./jwt.js");

var ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();

///////////////////
// API Endpoints //
///////////////////

// Get
// Incoming: id
// Outgoing: name, userId, error
savedRouter.post("/get", async (req, res) => {
	let retCode = 200;
	let message = "";
	var search = {};

	const {jwt, quizId, userId} = req.body;
	console.log("Begin GET for Saved Quiz with ID " + userId);

	// check if the jwt was given
	if (jwt == null)
	{
		res.status(403).json({error: "No valid token given"});
		return;
	}

	// this calls ./jwt.js
	const notValid = token.verify(jwt);

	// final validation check
	if (notValid)
	{
		res.status(403).json({error: "No valid token given"});
		return;
	}

	var newUserId = new ObjectId(userId);

	if (quizId != null)
	{
		var newQuizId = new ObjectId(quizId);
		search = {
			UserId: newUserId,
			QuizId: newQuizId
		};
	}
	else
	{
		search = {
			UserId: newUserId
		};
	}

	try
	{
		const db = client.db("LargeProject");
		const result = await db.collection('Saved').find(search).toArray();

		if (result.length == 0)
		{
			retCode = 204;

			var ret = {result: result, error: message};
		}
		else
		{
			var quizList = result.map((item) => {
				return {
					_id: item.QuizId,
					Name: item.QuizName,
				};
			});

			var ret = {result: quizList, error: message};
		}
	}
	catch(e)
	{
		retCode = 404;
		var ret = {error: e.message};
	}

	res.status(retCode).json(ret);
});

// Add
// Incoming: userId, quizId
// Outgoing: id, error
savedRouter.post("/add", async (req, res) => {
	let retCode = 200;
	let message = "";

	const {jwt, userId, quizId} = req.body;
	
	var newUserId = new ObjectId(userId);
	var newQuizId = new ObjectId(quizId);

	const newQuiz = {UserId: newUserId, QuizId: newQuizId};

	console.log("Saving Quiz with userId " + userId + " and quizId " + quizId);

	// check if the jwt was given
	if (jwt == null)
	{
		res.status(403).json({error: "No valid token given"});
		return;
	}

	// this calls ./jwt.js
	const notValid = token.verify(jwt);

	// final validation check
	if (notValid)
	{
		res.status(403).json({error: "No valid token given"});
		return;
	}

	try
	{
		var result;
		const db = client.db("LargeProject");

		if(userId == "" || quizId == "")
			retCode = 204;
		else
			result = await db.collection('Saved').insertOne(newQuiz);

		var ret = {result: result, error: message};
	}
	catch(e)
	{
		retCode = 404;
		var ret = {error: e.message};
	}

	res.status(retCode).json(ret);
});

// Delete
// Incoming: id
// Outgoing: name, userId, error
savedRouter.delete("/delete", async (req, res) => {
	let retCode = 200;
  let message = "";
  
	const {jwt, id} = req.body;

	var newId = new ObjectId(id);
	
	console.log("Begin DELETE for Saved Quiz " + id);

	// check if the jwt was given
	if (jwt == null)
	{
		res.status(403).json({error: "No valid token given"});
		return;
	}

	// this calls ./jwt.js
	const notValid = token.verify(jwt);

	// final validation check
	if (notValid)
	{
		res.status(403).json({error: "No valid token given"});
		return;
	}
	
	try
	{
		const db = client.db("LargeProject");

		const result = await db.collection('Saved').deleteOne({_id: newId});
	
		if (result.deletedCount == 1)
			message = "Successfully deleted Saved Quiz " + id;
		else
			retCode = 204;

	var ret = {error: message};
	}
	catch(e)
	{
		retCode = 404;
		var ret = {error: e.message};
	}
	
	
	res.status(retCode).json(ret);
});

module.exports = savedRouter;