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
usersRouter.post("/login", async (req, res) => {
  // Incoming: login, password
  // Outgoing: id, firstName, lastName
  let error = "";
  var id = -1;
	var fn = '';
	var ln = '';

  const {login, password} = req.body;

  hashPassword = getHash(password);
  
  console.log({login, password});

  try
  {
    const db = client.db("LargeProject");
    const results = await db.collection('Users').find({Login:login, Password:hashPassword}).toArray();

		if( results.length > 0 )
		{
			id = results[0]._id;
			fn = results[0].FirstName;
			ln = results[0].LastName;

      var ret = {id:id, firstName:fn, lastName:ln, error:error};
      // var ret = getToken({id:id, firstName:fn, lastName:ln, error:error});
		}
    else
    {
      var ret = {error:'Wrong username/password combination'};
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
usersRouter.post("/register", async (req, res) => {
  // incoming: login, password, firstName, lastName, email
  // outgoing: error
  let error = "";
  const { login, password, firstName, lastName, email } = req.body;

  const hashPassword = getHash(password);

  console.log("Begin REGISTER for User " + login);

  const newUser = {Login:login,Password:hashPassword,FirstName:firstName,LastName:lastName,Email:email,Verified:false};
  try
  {
    // console.log(url);
    const db = client.db("LargeProject");
    const result = await db.collection("Users").insertOne(newUser);

    // I'm not 100% as to why this is a for loop?
    for (let i = 0; i < result.length; i++)
    {
      _ret.push(result[i]);
    }
  }
  catch(e) {
    error = e.toString();
  }

  var ret = { error: error };
  // var ret = getToken({ error: error });

	res.status(200).json(ret);
});

// Delete
usersRouter.delete("/delete", async (req, res) => {
	// Incoming: login, password
	// Outgoing: firstName, lastName
	let error = "";
  
	const {login, password} = req.body;
  
	hashPassword = getHash(password);
	
	console.log("Begin DELETE for User " + login);
  
	try
	{
		const db = client.db("LargeProject");

		const results = await db.collection('Users').deleteOne({Login:login, Password:hashPassword}).toArray();
	
		if(result.deletedCount == 1)
		{
			console.log("Successfully deleted user " + login);
		}
		else
		{
			var ret = {error:'User not found.'};
		}
	}
	catch(e)
	{
		error = e.toString();
		var ret = {error:e.message};
	}
  
	
	res.status(200).json(ret);
});

usersRouter.post("/verify", async (req, res) => {
  // Incoming: login, password
  // Outgoing: id, firstName, lastName
  let error = "";
  var id = -1;
	var fn = '';
	var ln = '';

  const {login, password} = req.body;

  hashPassword = getHash(password);
  
  console.log("Begin VERIFY for User " + login);

  try
  {
    const db = client.db("LargeProject");
    const results = await db.collection('Users').find({Login:login, Password:hashPassword}).toArray();

		if( results.length > 0 )
		{
			id = results[0]._id;

      const edit = {$set: {Verified:true}};

      await db.collection('Users').updateOne({Login:login, Password:hashPassword}, edit);

      var ret = {id:id, error:error};
		}
    else
    {
      var ret = {error:'Wrong username/password combination'};
    }
  }
  catch(e)
  {
    error = e.toString();
    var ret = {error:e.message};
  }

  
	res.status(200).json(ret);
});

module.exports = usersRouter;
