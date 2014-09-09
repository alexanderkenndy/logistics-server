/*
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
var rccode = require('./../utils/rccode'),
	logger = require('./../utils/logger'),
	_self;
/**
 * compute ip whether blocked
 */
function _blocked(req) {
	var url = req.url,
		isBlocked = false,
		remoteAddress = req.connection.remoteAddress;
	/**
	 * query in redis if this remote user access our system 30times in 1 minute,then it's a machine,so block it
	 * Design of block redis
	 * @access times
	 * @first access time
	 * @this access time
	 */
	var redisClient = module.parent.parent.exports.redisClient;

	/**
	 * if redis is not connected, then use mongodb instead
	 */
	if (redisClient) {
		var redisKey = '' + method + remoteAddress;
		redisClient.get(redisKey, function(err, reply) {
			if (err) {
				logger.error('Exception' + err.stack);
				isBlocked = _mongoCheck();
			}


			if (reply && reply.toString() === 'accessed') {
				isBlocked = true;
			} else {
				redisClient.set(redisKey, 'accessed');
				isBlocked = false;
			}
		});
	} else {
		isBlocked = _mongoCheck();
	}

	return isBlocked;
};

function _mongoCheck() {
	return false;
}

_self = {
	check : function(req, res) {
		if (_blocked(req)) {
			res.send({
				'rc' : rccode.RES_BLOCKED,
				'msg': 'invalid url'
			});

			return false;
		}

		return false;
	}
};
module.exports = _self;
