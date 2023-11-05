const { resourceLimits } = require("worker_threads");

const quizzesRouter = require("express").Router();
require("dotenv").config();

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
quizzesRouter.post("/get", async (req, res) => {
	let error = 200;

	const {id} = req.body;

	// some annoying variable jargon
	var _id = new ObjectId(id);

	console.log("Begin GET for Quiz with ID" + id);

	try
	{
		const db = client.db("LargeProject");
		const result = await db.collection('Quizzes').find({_id}).toArray();

		if (result.length > 0)
		{
			quizName = result[0].Name;
				userId = result[0].UserId;

			var ret = {Name:quizName, UserId:userId, error:error};
		}
		else
		{
			var ret = {error:404};
		}
	}
	catch(e)
	{
		error = e.toString();
		var ret = {error:e.message};
	}

	res.status(200).json(ret);
});

// Search
// Incoming: term, public (both are optional, but term must be inputted)
// Outgoing: result = {id, name, public}, error
quizzesRouter.post("/search", async (req, res) => {
	let error = 200;
	var search;

	// public here needs to be true/false
	const {term, public} = req.body;

	console.log("Begin Search for Quiz with term" + term + (public ? ("with Public Tag " + public) : ""));

	// note that for "contains" queries, we need to manipulate the search
	// using some annoying advanced queries
	// the "i" just signifies to check if it's "in" rather than doing a compareTo()
	if (public)
	{
		search = {
			$and: [{Public: 0}],
			$or: [{
			Name: { $regex: term, $options: "i"}
			}]
		};
	}
	else
	{
		search = {
		$or: [{
			Name: { $regex: term, $options: "i"}
			}]
		};
	}
  
  // projections can be used to specify what to return
  var projection = {
    projection: {_id: 1, Name: 1, Public: 1}
  }

  try
  {
    const db = client.db("LargeProject");
    const result = await db.collection('Quizzes').find(search, projection).toArray();

    if (result.length == 0)
      error = 204;

    var ret = {result:result, error:error};
  }
  catch(e)
  {
    error = e.toString();
    var ret = {error:e.message};
  }

  res.status(200).json(ret);
});

// Add
// Incoming: name, public (default: 0), userId
// Outgoing: id, error
quizzesRouter.post("/add", async (req, res) => {
	let error = 200;

	const {name, public, userId} = req.body;

	const newQuiz = {Name:name, Public:public, UserId:userId};

	// idk what 0 is tbh
	if (!newQuiz.Public)
		newQuiz.Public = 0;

	console.log("Begin ADD for Quiz with Name " + name);

	try
	{
		const db = client.db("LargeProject");
		const result = await db.collection('Quizzes').insertOne(newQuiz);
		
		var ret = {id:result.insertedId, error: error};
	}
	catch(e)
	{
		error = e.toString();
		var ret = {error:e.message};
	}

	res.status(200).json(ret);
});

// Edit
// Incoming: id (required), name, public, UserId (optional; just input what is edited)
// Outgoing: error
quizzesRouter.post("/edit", async (req, res) => {
	let error = 200;

	const {id, name, public, userId} = req.body;

	// some annoying variable jargain part 2
	var _id = new ObjectId(id);

	console.log("Begin EDIT for Quiz with ID " + id);

	try
	{
		// readability and practicality is a sane man's job
		let update = {
		...userId != null ? {UserId:userId} : null,
		...name != null ? {Name:name} : null,
		...public != null ? {Public:public} : null
		};


		const edit = {$set: update};

		const db = client.db("LargeProject");
		const result = await db.collection('Quizzes').updateOne({_id}, edit);

		if (result.matchedCount == 0)
		{
		error = 404;
		}

		var ret = {error:error};
	}
	catch(e)
	{
		error = e.toString();
		var ret = {error:e.message};
	}

	res.status(200).json(ret);
});

module.exports = quizzesRouter;