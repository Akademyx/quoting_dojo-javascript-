var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({ extended: true }));

var dbURI = 'mongodb://localhost/quotes'
mongoose.connect(dbURI);

var UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quote: {type:String, required:true}
}, {timestamps:true})

const User = mongoose.model('quotes', UserSchema);


app.get('/', function (request, response) {
    response.render('index')
})

app.post('/submit', function(req, res){
    var user = new User({name: req.body.name, quote: req.body.quote })
    user.save(function(err, data){
        if(err) {res.render('index', {errors:user.errors})}
        res.redirect('/quotes')
    })
})

app.get('/quotes', function(req, res){
    console.log(User.find({}))
    User.find({}, function(err, result){
        if(err) {console.log(err)}
        res.render('quotes', {users: result})
    })
})


app.listen(8000, function () {
    console.log("Listening on port 8000, and then some...")
})