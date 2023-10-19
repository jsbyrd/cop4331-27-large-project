const Hash = require('crypto');
const { getServers, getDefaultResultOrder } = require('dns');

const usersRouter = require('express').Router();
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();

// functions //
function getToken(json)
{
  var ret;
  try
  {
    const token = require("./createJWT.js");
    var ret = token.createToken( json );
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

// Login
usersRouter.get("/", async (req, res) => {
  // Incoming: login, password
  // Outgoing: id, firstName, lastName
  let error = "";
  var id = -1;
	var fn = '';
	var ln = '';
  var ret;

  const {login, password} = req.body;

  newPassword = getHash(password);
  
  console.log({login, password});

  try
  {
    const db = client.db("LargeProject");
    const results = await db.collection('Users').find({Login:login, Password:newPassword}).toArray();

		if( results.length > 0 )
		{
			id = results[0]._id;
			fn = results[0].FirstName;
			ln = results[0].LastName;

      var ret = {id:id, firstName:fn, lastName:ln, error:error};
      // var ret = getToken({id:id, firstName:fn, lastName:ln, error:error});
		}
  }
  catch(e)
  {
    error = e.toString();
    ret = {error:e.message};
  }

  
	res.status(200).json(ret);
});

// Register
usersRouter.post("/", async (req, res) => {
  // incoming: login, password, firstName, lastName, email
  // outgoing: error
  let error = "";
  const { login, password, firstName, lastName, email } = req.body;

  const newPassword = getHash(password);

  const newUser = {Login:login,Password:newPassword,FirstName:firstName,LastName:lastName,Email:email};
  try
  {
    // console.log(url);
    const db = client.db("LargeProject");
    const result = await db.collection("Users").insertOne(newUser);
    console.log(result);

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

usersRouter.post("/")

module.exports = usersRouter;
