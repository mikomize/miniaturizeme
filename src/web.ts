///<reference path='node.d.ts'/>
///<reference path='underscore.d.ts'/>
///<reference path='express.d.ts'/>

var express = require('express');
var app = express();
var exec = require('child_process').exec;
var fs = require('fs');

var pid = 0;

var getScreenshot = function (address, screenWidth, screenHeight, callback) {
  var output = pid++ + '.png';
  var tmp = "phantomjs phantomjs/rasterize.js '" + address + "' '" + output + "' " + screenWidth + " " + screenHeight;
  console.log(tmp);
  var child = exec("phantomjs phantomjs/rasterize.js '" + address + "' '" + output + "' " + screenWidth + " " + screenHeight, function (error, stdout, stderr) {
    callback(output);
  });
};

app.get('/', function(req, res) {
    getScreenshot(req.query.address, req.query.screenWidth, req.query.screenHeight, function (filename) {
      res.download(filename, 'screenshot.png', function () {
        fs.unlinkSync(filename);
      });
    });
});

app.listen(6668);

