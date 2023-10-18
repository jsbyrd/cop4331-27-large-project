const usersRouter = require("express").Router();
require("dotenv").config();

const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();

// Login
usersRouter.get("/", async (req, res) => {
  // Incoming: login, password
  // Outgoing: id, firstName, lastName
  let error = "N/A";

  try
  {
    // console.log(url);
    const {login, password} = req.body;
    console.log(req.body);
    const db = client.db("LargeProject");
    const results = await db.collection('Users').find({Login:login, Password:password}).toArray();
    console.log(results[0]);

    var id = -1;
		var fn = '';
		var ln = '';

		if( results.length > 0 )
		{
			id = results[0]._id;
			fn = results[0].FirstName;
			ln = results[0].LastName;
		}

    var ret = { id:id, firstName:fn, lastName:ln, error:''};
		res.status(200).json(ret);
  }
  catch(e) {
    error = e.toString();
  }
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
