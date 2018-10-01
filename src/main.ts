"use strict"
import Service = require('./server/WebService');
import FileMgr = require('./server/Filemanager');

var webService: Service.WebService = new Service.WebService();
var fileManager: FileMgr.FileManager = new FileMgr.FileManager();
if (!fileManager.checkFile('index.html')) {
	console.log('Copying files!');
	fileManager.copyDirContent("../../src/web/");
}
webService.start(8081);
