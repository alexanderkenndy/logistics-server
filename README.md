logistics-server
================

[![Build Status](https://secure.travis-ci.org/alexanderkenndy/logistics-server.svg)](http://travis-ci.org/alexanderkenndy/logistics-server)
##Introduction
logistics-server
##Getting Started
- Build Server
```
	npm install  //install the node_modules env
	sudo apt-get install mongodb   //install the database
	sudo cp reference/mongodb.conf /etc/     //copy mongdb conf to /etc/ or you can config it yourself
```
- Unit test
```
	sudo npm install -g karma   //use karma and jasmine to do the js unit and coverage
	karma start karma.config.js   //use the configuration file to do the js unit test
```
- Start server
	npm start
```
- Access path
```
	http://localhost:8080
```
##Documents
For more information,plese refer to
[Documents](https://alexanderkenndy.github.io)
