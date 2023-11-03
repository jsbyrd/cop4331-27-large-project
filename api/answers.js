const answersRouter = require("express").Router();
require("dotenv").config();

var ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();

///////////////////
// API Endpoints //
///////////////////

// TODO: Get

// TODO: Add
// Add with a string
// Throw the quiz id in

// TODO: Edit
// Reference the quiz stuff with the ...

// TODO: Delete