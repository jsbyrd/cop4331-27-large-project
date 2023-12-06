const Hash = require('crypto');
// let cookieParser = require("cookie-parser");
const { getServers, getDefaultResultOrder } = require('dns');

const usersRouter = require('express').Router();
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();

///////////////////
// API Endpoints //
///////////////////

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
// Outgoing: id, firstName, lastName
usersRouter.post("/login", async (req, res) => {
  let retCode = 200;
  let message = "";

  const {login, password} = req.body;

  hashPassword = getHash(password);
  
  console.log({login, password});

  try
  {
    const db = client.db("LargeProject");
    const result = await db.collection('Users').findOne({Login:login, Password:hashPassword});

    console.log("Result.verified: " + result.Verified);

		if (result == null)
		{
      retCode = 403;
      message = "Username/password combination incorrect";
		}
    else if (!result.Verified)
    {
      retCode = 403;
      message = "User not verified";
    }
    else
    {
      var userJSON = {
        id: result._id,
        firstName: result.FirstName,
        lastName: result.LastName
      }
      const token = getToken(userJSON);
      var retJSON = {
        id: result._id,
        firstName: result.FirstName,
        lastName: result.LastName,
        email: result.Email,
        token: token.accessToken
      }

      console.log(token);

      var expireTime = new Date();
      expireTime.setHours(expireTime.getHours() + 24);

      res.cookie("loginId", result._id, {
        expires: expireTime,
        sameSite: 'lax'
      });
    }

    var ret = {result: retJSON, error: message};
  }
  catch(e)
  {
    retCode = 404;
    var ret = {error:e.message};
  }

	res.status(retCode).json(ret);
});

usersRouter.post("/getemail", async (req, res) => {
  var retCode = 200;
  var message = "";
  const { login } = req.body;

  console.log("Begin GET EMAIL for User " + login);

  try
	{
		const db = client.db("LargeProject");
		const result = await db.collection('Users').findOne({Login: login}, {projection: {Email: 1}});

		if (result == null)
			retCode = 200;

		var ret = {result: result, error: message};
	}
	catch(e)
	{
		retCode = 404;
		var ret = {error: e.message};
	}

	res.status(retCode).json(ret);
});

// Register
// incoming: login, password, firstName, lastName, email
// outgoing: error
usersRouter.post("/register", async (req, res) => {
  let retCode = 200;
  let message = "";

  const { login, password, firstName, lastName, email } = req.body;

  const hashPassword = getHash(password);

  console.log("Begin REGISTER for User " + login);

  const newUser = {Login: login, Password: hashPassword, FirstName: firstName, LastName: lastName, Email: email, Verified: false};
  try
  {
    const db = client.db("LargeProject");
    const result = await db.collection("Users").insertOne(newUser);

    var ret = {result: result.insertedId, email:email, login:login, password:hashPassword, error: message};
  }
  catch(e) {
    retCode = 404;
    var ret = {error: e.message};
  }

	res.status(retCode).json(ret);
});

// Delete
// Incoming: login, password
// Outgoing: firstName, lastName
usersRouter.delete("/delete", async (req, res) => {
	let retCode = 200;
  let message = "";
  
	const {login, password} = req.body;
  
	hashPassword = getHash(password);
	
	console.log("Begin DELETE for User " + login);
  
	try
	{
		const db = client.db("LargeProject");

		const result = await db.collection('Users').deleteOne({Login:login, Password:hashPassword});
	
		if (result.deletedCount == 1)
		{
			message = "Successfully deleted user " + login;
		}
		else
		{
			retCode = 403;
      message = "User does not exist.";
		}

    var ret = {error: message};
	}
	catch(e)
	{
		retCode = 404;
		var ret = {error: e.message};
	}
  
	
	res.status(retCode).json(ret);
});

// Verify
// Incoming: login, password
// Outgoing: error
usersRouter.post("/verify", async (req, res) => {
  let retCode = 200;
  let message = "";

  const {login, password} = req.body;
  hashPassword = getHash(password);
  
  console.log("Begin VERIFY for User " + login);

  try
  {
    const edit = {$set: {Verified: true}};

    const db = client.db("LargeProject");
    const result = await db.collection('Users').updateOne({Login:login, Password:hashPassword}, edit);

		if (result.modifiedCount == 0)
    {
      retCode = 403;
      message = "User not found";
    }

    var ret = {error: message};
  }
  catch(e)
  {
    retCode = 404;
    var ret = {error: e.message};
  }
  
	res.status(retCode).json(ret);
});

// Verify
// Incoming: login, password
// Outgoing: error
usersRouter.post("/recovery", async (req, res) => {
  let retCode = 200;
  let message = "";

  const {login, newPassword} = req.body;
  newHashPassword = getHash(newPassword);
  
  console.log("Begin RECOVERY for User " + login);

  try
  {
    const edit = {$set: {Password: newHashPassword}};

    const db = client.db("LargeProject");
    const result = await db.collection('Users').updateOne({Login:login}, edit);

		if (result.modifiedCount == 0)
    {
      retCode = 403;
      message = "User not found";
    }

    var ret = {error: message};
  }
  catch(e)
  {
    retCode = 404;
    var ret = {error: e.message};
  }
  
	res.status(retCode).json(ret);
});

module.exports = usersRouter;
