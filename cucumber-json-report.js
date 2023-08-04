var fs = require('fs-extra');
var path = require('path');
var moment = require('moment');
var Cucumber = require('@cucumber/cucumber');

module.exports = function() {

  var JsonFormatter = Cucumber.Listener.JsonFormatter();

  JsonFormatter.log = function(string) {

    var outputDir = './reports';
    var targetJson = outputDir + '/cucumber_report.json';

    if (fs.existsSync(outputDir)) {
      fs.moveSync(outputDir, outputDir + '_' + moment().format('YYYYMMDD_HHmmss') + "_" + Math.floor(Math.random() * 10000), {
        overwrite: true
      });
    }
    fs.mkdirSync(outputDir);
    fs.writeFileSync(targetJson, string);
  };
  this.registerListener(JsonFormatter);
};