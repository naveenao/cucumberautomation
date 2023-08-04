var reporter = require('cucumber-html-reporter');

    module.exports = function() {

      this.AfterFeatures(function(features, callback) {
        var options = {
          theme: 'bootstrap',
          jsonFile: 'reports/cucumber_report.json',
          output: 'reports/cucumber_report.html',
          reportSuiteAsScenarios: true
        };

        reporter.generate(options);
        callback();
      });
};