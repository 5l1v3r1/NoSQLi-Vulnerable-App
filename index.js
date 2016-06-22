var express = require('express');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');


var UserSchema = new mongoose.Schema({
	name: String,
	user: String,
	pass: String
});


var User = mongoose.model('User', UserSchema);
[['User', 'ama@@d', 'acs@@ac'],  ['Joomla', 'badassa', '1@@@#$#233113']].forEach(function (cred) {
	var instance = new User();
	instance.name = cred[0];
	instance.user = cred[1];
	instance.pass = cred[2];
	instance.save();
});

var app = express();
app.engine('.hbs', exphbs({defaultLayout: 'single', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(require('body-parser').urlencoded({extended: true}));


app.get('/', function(req, res) {
	res.render('index',{message: ''});
});


app.get('/login', function(req, res) {
	User.findOne({user: req.query.user, pass: req.query.pass}, function (err, user) {

		if (err) {
			return res.render('index', {message: err.message});
		}


		if (!user) {
			return res.render('index', {message: 'Sorry!'});
		}


		return res.render('index', {message: 'Flag: '});
	});
});


var server = app.listen(9090, function () {
	mongoose.connect('mongodb://localhost/acme-no-login');
	console.log('listening on port %d', server.address().port);
});

