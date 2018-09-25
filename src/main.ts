"use strict"
import Service = require('./server/WebService');

var webService: Service.WebService = new Service.WebService();
webService.start(8081);
