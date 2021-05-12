//jshint strict: false

exports.config = {

  allScriptsTimeout: 11000,

  directConnect: true,
  multiCapabilities: [
    {
      'browserName': 'chrome',
      'unexpectedAlertBehaviour': 'ignore',
      'chromeOptions': {
        prefs: {
          download: {
            'prompt_for_download': false,
            'directory_upgrade': true,
            'default_directory': __dirname + "\\Downloads"
          }
        }
      }
    }
  ],

  onPrepare: function () {

    browser.manage().window().maximize();
    browser.manage().timeouts().implicitlyWait(5000);
    browser.waitForAngularEnabled(false);
  },

  specs: [
      'SampleTest1.js',
      'SampleTest2.js'

  ],

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

};
