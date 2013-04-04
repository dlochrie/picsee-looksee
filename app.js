/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
	, picsee = require('picsee');

// Picsee options
var root = __dirname;
var sandbox = root + "/photos/sandbox/";
var processing = root + "/photos/preprocess/";
var uploaded = root + "/photos/uploaded/";

var options = {
	sandboxDir: sandbox,
	processDir: processing,
	uploadDir: uploaded,
	versions: [  
		{ "thmb": { w: 32, h: 32 } },   
		{ "profile": { w: 200, h: null } },  
		{ "full": { w: null, h: null } }  
	],
	separator: '_',  
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

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', msg: false });
});

app.post('/upload', function(req, res, next) { 
	picsee.upload(req, res, function(msg) { res.send(msg); }); } 
);

app.post('/crop', picsee.crop);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
