const Hash = require('crypto');
const { getServers, getDefaultResultOrder } = require('dns');

const usersRouter = require('express').Router();
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();

///////////////
// Functions //
///////////////

// function used for some DB calls
// not sure what it does yet!
function getResult(error, result)
{
  cb(error, result);
}

function getToken(json)
{
  var ret;
  try
  {
	const token = require("./createJWT.js");
	ret = token.createToken( json );
  }
  catch(e)
  {
	error = e.toString();
	ret = {error:e.message};
  }

  return ret;
}

function getHash(string)
{
  // hello dear viewer
  // the hashing is very ugly
  // but it will be a separate function soon
  const hash = Hash.createHash('sha256');

  // you need to keep reassigning these over and over
  // this can probably be offset by using var instead of const
  // but I don't have time to work up the syntax of nodejs
  const updatedHash = hash.update(string);

  // the last step is to digest the hash
  // mmm yummy
  // I actually don't know what this does though
  return updatedHash.digest('hex');
}

///////////////////
// API Endpoints //
///////////////////

// Login
// Incoming: login, password
// Outgoing: id, firstName, lastName, error
usersRouter.post("/login", async (req, res) => {

	let error = 200;
	var id = -1;
	var fn = '';
	var ln = '';

	const {login, password} = req.body;

	hashPassword = getHash(password);
  
	console.log("Begin LOGIN for User " + login);

	try
	{
		const db = client.db("LargeProject");
		const result = await db.collection('Users').find({Login:login, Password:hashPassword}).toArray();

		if(login == "" || password == "")
		{
			error = "You have a blank Login or Password parameter. NO LOGGING IN FOR YOU!!!"
			var ret = {error:error};
		}
		else
		{
			if( result.length > 0)
			{
			id = result[0]._id;
			fn = result[0].FirstName;
			ln = result[0].LastName;

			// var ret = getToken({id:id, firstName:fn, lastName:ln, error:error});
			}
			else
			{
				error = 401;
			}

			var ret = {id:id, firstName:fn, lastName:ln, error:error};
		}
	}
	catch(e)
	{
		error = e.toString();
		var ret = {error:e.message};
	}
  
	res.status(200).json(ret);
});

// Register
// Incoming: login, password, firstName, lastName, email
// Outgoing: id, error
usersRouter.post("/register", async (req, res) => {
	let error = 200;
	const { login, password, firstName, lastName, email } = req.body;
	const hashPassword = getHash(password);

	console.log("Begin REGISTER for User " + login);

	const newUser = {Login:login,Password:hashPassword,FirstName:firstName,LastName:lastName,Email:email,Verified:false};
	try
	{
		if(login == "" || password == "" || firstName == "" || lastName == "" || email == "")
		{
			error = "You have a blank parameter somewhere. NO REGISTERING FOR YOU!!!"
			var ret = {error:error};
		}
		else
		{
			// console.log(url);
			const db = client.db("LargeProject");
			const result = await db.collection("Users").insertOne(newUser);

			var ret = {id:result.insertedId, error: error };
		}
	}
	catch(e) {
		error = e.toString();
	}

	// var ret = getToken({ error: error });

	res.status(200).json(ret);
});

// Delete
// Incoming: login, password
// Outgoing: error
usersRouter.delete("/delete", async (req, res) => {
	let error = 200;
  
	const {login, password} = req.body;
	hashPassword = getHash(password);
	
	console.log("Begin DELETE for User " + login);
	
	try
	{
		const db = client.db("LargeProject");

		const result = await db.collection('Users').deleteOne({Login:login, Password:hashPassword});
	
		if(result.deletedCount == 1)
		{
			console.log("Successfully deleted user " + login);
		}
		else
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

// Incoming: login, password
// Outgoing: id, error
usersRouter.post("/verify", async (req, res) => {
  
	let error = 200;
	var id = -1;
	var fn = '';
	var ln = '';

	const {login, password} = req.body;
	hashPassword = getHash(password);
  
	console.log("Begin VERIFY for User " + login);

	try
	{
		const db = client.db("LargeProject");
		const result = await db.collection('Users').find({Login:login, Password:hashPassword}).toArray();

		if( result.length > 0 )
		{
			id = result[0]._id;

			const edit = {$set: {Verified:true}};

			await db.collection('Users').updateOne({Login:login, Password:hashPassword}, edit);

			var ret = {id:id, error:error};
		}
		else
		{
			error = 404;
		}

		var ret = {id:id, error:error};
	}
	catch(e)
	{
		error = e.toString();
		var ret = {error:e.message};
	}

	
	res.status(200).json(ret);
});

module.exports = usersRouter;
