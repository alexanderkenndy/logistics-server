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
 * module exports dependances
 */
var app = module.parent.exports.app,
	home = require('./route/home'),
	rccode = require('./utils/rccode'),
	user = require('./route/user');

/**
 * home page
 */
app.get('^\/$|^\/index(\.htm(l)?)?$', home.getIndex);

app.get('/users', user.getUsers);
app.get('/users/:uid', user.getUser);

/**
 * 404 page
 */
app.use(function(req,res) {
    res.status(400);
	res.send(rccode.RES_EXCEPTION);
});


