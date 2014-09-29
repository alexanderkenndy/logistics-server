/**
 * if timeout, emit "timeout" event, abort request, 
 * and emit "abort" event for response
 * @param options
 * @param timeout
 * @param callback
 */

var url = require('url'),
	http = require('http');

function httpGetWithTimeoutSupport(options, timeout, callback) {
		var timeoutEvent;
		var req = http.get(options, function(res) {
			res.on("end", function() {
				clearTimeout(timeoutEvent);
				console.log("end");
			})

			res.on("close", function(e) {
				clearTimeout(timeoutEvent);
				console.log("close");
			})

			res.on("abort", function() {
				console.log("abort");
			});
			callback(res);
		});
		req.on("timeout", function() {
			console.log("timeout received");
			if (req.res) {
				req.res.emit("abort");
			}
			req.abort();
		});
		timeoutEvent = setTimeout(function() {
			req.emit("timeout");
		}, timeout);
		return req;
 }

httpGetWithTimeoutSupport(url.parse("http://www.baidu.com"), 10000, function(res){
	var data = "";

	res.on("data", function(d) {
		data += d;
	});

	res.on("end", function() {
		console.log(data);
	});
});
