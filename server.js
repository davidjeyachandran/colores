const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
var db;

app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect('mongodb://admin:password10@ds123625.mlab.com:23625/dj-quotes', { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err);
    
    db = client.db('dj-quotes')
    app.listen(3000, function() {
        console.log('listen on 3000');
    });
})

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    db.collection('quotes').find().toArray(function(err, results) {
        // console.log(results);      
    })
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/submit', (req, res) => {
    console.log(req.body);
    db.collection('quotes').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Saved to database');
        res.redirect('/submit')
    })
})

app.get('/submit', function(req, res) {
    db.collection('quotes').find().toArray(function(err, results) {
        console.log(results)
        res.send('<h1>Hey</h1>');
        // send HTML file populated with quotes here
      })
});