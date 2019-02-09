const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const dbLogin = require('./dbLogin');
var db;

console.log(dbLogin);

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

MongoClient.connect('mongodb://' + dbLogin.username + ':' + dbLogin.password + '@ds123625.mlab.com:23625/dj-quotes', { useNewUrlParser: true }, (err, client) => {
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
        res.redirect('/results')
    })
})

app.get('/results', function(req, res) {
    db.collection('quotes').find().toArray(function(err, results) {
        console.log(results)
        // res.send('<h1>Hey</h1>');
        var colorList = getColorList(results);
        console.log(colorList);
        res.render('results.ejs', {colorList: colorList})
        // send HTML file populated with quotes here
      })
});

function getColorList(results) {
    var colorList = new Object();
    
    results.forEach(function(item){
        if (isNaN(colorList[item.color])) colorList[item.color]=0;
        colorList[item.color]++;
    });

    return colorList;
}