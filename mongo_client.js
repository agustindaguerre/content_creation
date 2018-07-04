const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

let db

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'content_db';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db = client.db(dbName);

  // client.close();
});

const insertDocuments = function(data, callback) {
  // Get the documents collection
  const collection = db.collection('content');
  // Insert some documents
  collection.insertMany([
    data
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted 1 document into the collection");
    callback(result);
  });
}

const getDocuments = function(callback) {
  // Get the documents collection
  const collection = db.collection('content');
  // Insert some documents
  collection.find().toArray(function(err, docs) {
    assert.equal(null, err);
    console.log(docs);
    callback(docs);
  });
}

module.exports = {
  client: MongoClient,
  insertDocuments,
  getDocuments,
}
