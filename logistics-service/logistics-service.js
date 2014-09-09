/**
 *
The MIT License (MIT)

Copyright (c) 2014 Xiaofa Zhang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

"use strict";

/**
 * gloabl dependance module
 */
var http = require('http'),
	express = require('express'),
	redis = require('redis'),
	util = require('util'),
	path = require('path');
/**
 * local dependance module
 */
var config = require('./config'),
	logger = require('./utils/logger'),
	app = module.exports.app = express(),
	server = module.exports.server = http.createServer(app),
	intercepters = require('./intercepters'),
	redisClient = redis.createClient(config.redisPort, config.redisHost, config.redisOpt),
	sessionStore = module.exports.sessionStore = new express.session.MemoryStore();

/**
 * global configuration
 */
app.set('port', config.port || process.env.PORT);
app.set('views',  __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(intercepters.securityCheck());
app.use(express.cookieParser(config.cookie_secret));
app.use(express.session({
	store: sessionStore, 
	cookie: {
		maxAge: 1000 * 60 * 60 * 6
	}
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

/**
 * routes handler
 */
require('./routes');

if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

server.listen(app.get('port'), function () {
	var colorPort = '\x1b[1;37;42m' + app.get('port') + '\x1b[m';

	logger.info(config.name + ' server listening on port ' + colorPort);
	logger.info(config.name + ' version ' + config.version + '\n');

});

/**
 * Handle exceptions
 */
process.on('uncaughtException', function(err){
	logger.error('Exception: ' + err.stack);
});

redisClient.on('connect', function() {
	logger.info('connect to redis server success');	
});

redisClient.on('ready', function(res) {
	module.exports.redisClient = redisClient;
});

redisClient.on('error', function(err) {
	logger.error('Exception: '  + err.stack);
});
