const { resourceLimits } = require("worker_threads");

const quizzesRouter = require("express").Router();
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
// Incoming: quiz id (id)
// Outgoing: name, userId, error
quizzesRouter.post("/get", async (req, res) => {
	let retCode = 200;
	let message = "";

	const {id} = req.body;

	// some annoying variable jargon
	var _id = new ObjectId(id);

  var projection = {
    projection: {_id: 0}
  }

	console.log("Begin GET for Quiz with ID" + id);

	try
	{
		const db = client.db("LargeProject");
		const result = await db.collection('Quizzes').find({_id}, projection).toArray();

		if (result.length == 0)
			retCode = 204;

    var ret = {result:result, error: message};

	}
	catch(e)
	{
		retCode = 404;
		var ret = {error: e.message};
	}

	res.status(retCode).json(ret);
});

quizzesRouter.post("/getfromuser", async (req, res) => {
	let retCode = 200;
	let message = "";
	var search;

	// public here needs to be true/false
	const {userId, public} = req.body;

	console.log("Begin GET FROM ID for ID" + userId);

	if (public)
	{
		search = {
			Public: 0,
			UserId: userId
		};
	}
	else
	{
		search = {
			UserId: userId
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
      retCode = 204;

    var ret = {result: result, error: message};
  }
  catch(e)
  {
    retCode = 404;
    var ret = {error: e.message};
  }

  res.status(retCode).json(ret);
});

// Search
// Incoming: term, public (both are optional, but term must be inputted)
// Outgoing: result = {id, name, public}, error
quizzesRouter.post("/search", async (req, res) => {
	let retCode = 200;
	let message = "";
	var search;

	// public here needs to be true/false
	const {jwt, term, userId, public} = req.body;

	console.log("Begin Search for Quiz with term " + term + (public != null ? (" with Public Tag " + public) : ""));

	if (jwt == null)
	{
		res.status(403).json({error: "No valid token given"});
		return;
	}

	const notValid = token.verify(jwt);

	if (notValid)
	{
		res.status(403).json({error: "No valid token given"});
		return;
	}

	// note that for "contains" queries, we need to manipulate the search
	// using some annoying advanced queries
	// the "i" just signifies to check if it's "in" rather than doing a compareTo()
	if (public)
	{
		search = {
			$and: [{Public: 0}],
			$or: [{
			Name: { $regex: term, $options: "i"},
			...userId != null ? {UserId: userId} : null
			}]
		};
	}
	else
	{
		search = {
		$or: [{
			Name: { $regex: term, $options: "i"},
			...userId != null ? {UserId: userId} : null
			}]
		};
	}
  
  // projections can be used to specify what to return
  var projection = {
    projection: {_id: 1, Name: 1, Public: 1, UserId: 1}
  }

  try
  {
    const db = client.db("LargeProject");
    const result = await db.collection('Quizzes').find(search, projection).toArray();

    if (result.length == 0)
      retCode = 204;

    var ret = {result:result, error: message};
  }
  catch(e)
  {
    retCode = 404;
    var ret = {error: e.message};
  }

  res.status(retCode).json(ret);
});

// Add
// Incoming: name, public (default: 0), userId
// Outgoing: id, error
quizzesRouter.post("/add", async (req, res) => {
	let retCode = 200;
  let message = "";

	const {name, public, userId} = req.body;

	const newQuiz = {Name: name, Public: public, UserId: userId};

	// default it to public
	if (!newQuiz.Public)
		newQuiz.Public = 0;

	console.log("Begin ADD for Quiz with Name " + name);

	try
	{
		const db = client.db("LargeProject");
		const result = await db.collection('Quizzes').insertOne(newQuiz);
		
		var ret = {id: result.insertedId, error: message};
	}
	catch(e)
	{
		retCode = 404;
		var ret = {error:e.message};
	}

	res.status(retCode).json(ret);
});

// Edit
// Incoming: id (required), name, public, UserId (optional; just input what is edited)
// Outgoing: error
quizzesRouter.post("/edit", async (req, res) => {
	let retCode = 200;
  let message = "";

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

module.exports = quizzesRouter;
