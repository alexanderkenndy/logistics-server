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

THE SOFTWARE IS PROVidED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

"use strict";
var mongoose = require('mongoose'),
	mongoSchema = mongoose.Schema;

var UserModel = new mongoSchema({
	/* user id */
	uid: String,
	/* user account which is used for login system */
	account: {
		type: String,
		unique: true
	},
	/* show in UI */
	nickname: String,
	/* telephone like 021---*/
	tel: String,
	/* mobile like 137----*/
	mobile: String,
	/* '0' is male, '1' is female */
	gender: {
		type: String,
		default: '0'
	},
	/* user avatar default is system avatar */
	avatar: {
		type: String,
		default: 'sysAvatar'
	},
	regDate: {
		type: Date,
		defualt: Date.now
	}
});

mongoose.model('userModel', UserModel);
