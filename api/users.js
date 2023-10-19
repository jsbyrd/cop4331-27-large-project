const Hash = require('crypto');
const { getServers, getDefaultResultOrder } = require('dns');

const usersRouter = require('express').Router();
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();

// Login
usersRouter.get("/", async (req, res) => {
  // Incoming: login, password
  // Outgoing: id, firstName, lastName
  let error = "";
  var id = -1;
	var fn = '';
	var ln = '';

  try
  {
    // console.log(url);
    const {login, password} = req.body;

    // hello dear viewer
    // The hash functionality currently does not work
    // I cannot figure out how to assign variables without it hanging when
    // it sends to the db
    const hash = Hash.createHash('sha256');

    // you also need to keep reassigning these over and over
    // this can probably be offset by using var instead of const
    // but I don't have time to work up the syntax of nodejs
    const updatedHash = hash.update(password);

    // the last step is to digest the hash
    // mmm yummy
    // I actually don't know what this does though
    const newPassword = updatedHash.digest('hex');
    
    console.log({login, password});

    const db = client.db("LargeProject");
    const results = await db.collection('Users').find({Login:login, Password:newPassword}).toArray();

		if( results.length > 0 )
		{
			id = results[0]._id;
			fn = results[0].FirstName;
			ln = results[0].LastName;
		} 
    
    console.log(eat);
  }
  catch(e) {
    error = e.toString();
  }

  var ret = { id:id, firstName:fn, lastName:ln, error:''};
	res.status(200).json(ret);
});

// Register
usersRouter.post("/", async (req, res) => {
  // incoming: login, password, firstName, lastName, email
  // outgoing: error
  let error = "N/A";
  const { login, password, firstName, lastName, email } = req.body;
  const newUser = {Login:login,Password:password,FirstName:firstName,LastName:lastName,Email:email};

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
	res.status(200).json(ret);
});

usersRouter.post("/")

module.exports = usersRouter;
