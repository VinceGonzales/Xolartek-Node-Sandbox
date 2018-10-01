"use strict"
import Service = require('./server/WebService');
import FileMgr = require('./server/Filemanager');

var webService: Service.WebService = new Service.WebService();
var fileManager: FileMgr.FileManager = new FileMgr.FileManager();
fileManager.copyDirContent("../../src/web/");
console.log("Starting file service...");
webService.start(8081);
//fileManager.loadDirectory("../");
