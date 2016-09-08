// Karma configuration
// Generated on Wed Sep 07 2016 21:37:28 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './src',

    // using jasmine as our test framework
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      '../node_modules/angular/angular.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      '**/*.js'
    ],

    // no files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // TODO: add html2js when we start testing components with templates
    preprocessors: {},

    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    reporters: ['progress'],

    // karma web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // don't need karma's watching because we're using grunt for that
    autoWatch: false,

    // just using phantomJS for now for simple unit tests
    browsers: ['PhantomJS'],

    // by default, only run a single time
    // is overridden in the gruntfile for the background runner
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};
