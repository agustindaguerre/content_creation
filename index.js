const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const { client, insertDocuments, getDocuments } = require('./mongo_client')


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/content', (req, res) => {
  console.log('GET CONTENT')
  getDocuments(results => {
    console.log(results);
    res.send(results)
  })
})

app.post('/insert_content', (req, res) => {
  console.log('data', req.body)
  insertDocuments(req.body, result => {
    console.log(result);
    res.send('Inserted!!')
  })
})

app.listen(3001, () => console.log('Example app listening on port 3001!'))