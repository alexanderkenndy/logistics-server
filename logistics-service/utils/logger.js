var logger = require('log4js'),
	config = require('../config'),
	_self;

logger.configure(__dirname + '/../log4js.json');

_self = logger.getLogger(config.logType);
_self.setLevel(config.logLevel.toUpperCase());

module.exports = _self;
