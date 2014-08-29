/**
 * configs
 */
var _self = {

	name : '\x1b[1;37;42mLogistics\x1b[m',
	description : 'Logistics',
	version : '\x1b[4;31m0.0.1\x1b[m',

	base_url : '/',

	/**
	 * prefix of API request
	 */
	api_prefix : '/api',

	/**
	 * mongodb
	 */
	db : "mongodb://logistics:logistics@127.0.0.1:9001/logistics",

	/**
	 * Logistics Server Port
	 */
	port : 8080,

	/**
	 * cookie
	 */
	cookie_secret : 'logistics',
	
	/**
	 * log type
	 * there are two types
	 * 1.console print logs on console
	 * 2.file  print logs into file
	 */
	logType: 'console',

	/**
	 * log level
	 * 1.info
	 * 2.debug
	 * 3.warn
	 * 4.error
	 * 5.fatal
	 * 6.trace
	 */
	logLevel: 'error'

};

module.exports = _self; 
