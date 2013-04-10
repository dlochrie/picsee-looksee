/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
	, picsee = require('picsee');

// Picsee options
var root = __dirname + '/public/';
// For the sake of demo, keeping "staging" local to app, 
// but PLEASE change this for your app for security reasons.
var staging = root + 'images/staging/';
var processing = 'images/processing/';
var uploaded = 'images/uploaded/';

var options = {
	docRoot: root,
	urlRoot: 'http://localhost:3000/',
	stagingDir: staging,
	processDir: processing,
	uploadDir: uploaded,
	versions: [  
		{ "thmb": { w: 32, h: 32 } },   
		{ "profile": { w: 200, h: null } },  
		{ "full": { w: null, h: null } }  
	],
	separator: '_',  
	directories: 'single',
	namingConvention: 'date',
	inputFields: ['profPhoto', 'other']
}

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
	/**
	 * Init picsee
	 */
	picsee.initialize(options);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


/**
 * Show Form
 */
app.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', results: false });
});

/**
 * Handle Upload and show Crop Form, or if err, return to Upload
 */
app.post('/upload', function (req, res, next) { 
	picsee.upload(req, res, function (err, results) { 
		if (err) res.send(err);
		res.render('crop', { title: 'Save or Crop You Photos', results: results || false });
	})
});

/**
 * Handle Upload, or if err, return to Form
 */
app.post('/crop', function (req, res, next) {
	picsee.crop(req, res, function (err, results) {
		if (err) res.send(err);
		res.render('success', { title: 'Success!', results: results || false });
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
