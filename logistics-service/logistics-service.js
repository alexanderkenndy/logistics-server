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
	util = require('util'),
	path = require('path');
/**
 * local dependance module
 */
var routes = require('./routes'),
	config = require('./config');

var app = module.exports.app = express(),
	server = module.exports.server = http.createServer(app),
	sessionStore = module.exports.sessionStore = new express.session.MemoryStore();

/**
 * global configuration
 */
app.set('port', config.port || process.env.PORT);
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser(config.cookie_secret));
app.use(express.session({
	store: sessionStore, 
	cookie: {
		maxAge: 1000 * 60 * 60 * 6
	}
}));

server.listen(app.get('port'), function () {
	console.log('Logistics server listening on port ' + app.get('port'));
	console.log(config.name + " version " + config.version + '\n');
});

/**
 * Handle exceptions
 */
process.on('uncaughtException', function(err){
	console.error('Exception: ' + err.stack);
});




























