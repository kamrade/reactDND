var express = require('express');
var app = express();
const port = process.env.PORT || 3333;

app.use(function(req, res, next) {
	if(req.headers['x-forwarded-proto'] === 'https') {
		res.redirect('http://' + req.hostname + req.url);
	} else {
		next();
	}
});
app.use(express.static('public'));

app.set('views', './public/views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
	res.render('index', {
		title: 'React Boilerplate'
	});
});

app.listen(port, function() {
	console.log('express server is up on port ' + port);
});
