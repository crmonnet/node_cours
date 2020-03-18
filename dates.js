const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'myproject';

const client = new MongoClient(url);

client.connect(async err => {
  const collection = client.db("test").collection("dates");
  // affiche la liste des documents de la collection dates dans la sortie standard
  const dates = await collection.find({}).toArray();
  console.log('dates:', dates)
  client.close();
});
