
module.exports = function (config) {
    'use strict';

    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        // base path, that will be used to resolve files and exclude
        basePath: '../',
        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],
        // list of files / patterns to load in the browser
        files: [
            'app/bower_components/showdown/dist/showdown.min.js',
            'app/bower_components/showdown-table/dist/showdown-table.min.js',
            'app/bower_components/highlightjs/highlight.pack.js',
            'app/bower_components/jquery/dist/jquery.min.js',
            'app/bower_components/flexslider/jquery.flexslider-min.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-material-icons/angular-material-icons.js',
            'app/bower_components/angular-flexslider/angular-flexslider.js',
            'app/bower_components/angular-animate/angular-animate.min.js',
            'app/bower_components/angular-aria/angular-aria.min.js',
            'app/bower_components/angular-resource/angular-resource.min.js',
            'app/bower_components/angular-material/angular-material.js',
            'app/bower_components/angular-sanitize/angular-sanitize.min.js',
            'app/bower_components/angular-highlightjs/angular-highlightjs.min.js',
            'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'app/bower_components/angular-ivonet-markdown/dist/angular-ivonet-markdown.min.js',
            'app/bower_components/angular-mocks/angular-mocks.js',

            'app/js/cards/cards.module.js',
            'app/js/cards/cards.controller.js',
            'app/js/cards/cards.service.js',

            'app/js/menu/menu.module.js',
            'app/js/menu/menu.factory.js',
            'app/js/menu/menu.link.js',
            'app/js/menu/menu.toggle.js',
            'app/js/menu/menu.nospace.filter.js',
            'app/js/menu/menu.humanize.filter.js',

            'app/js/components/components.module.js',
            'app/js/app.module.js',
            'app/js/app.config.js',
            'app/js/app.safehtml.filter.js',
            'test/spec/app.safehtml.filter.js'
        ],
        // list of files / patterns to exclude
        exclude: [],
        // web server port
        port: 8080,
        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            'PhantomJS'
        ],
        // Which plugins to enable
        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-coverage'
        ],
        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,
        colors: true,
        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,
        // Uncomment the following lines if you are using grunt's server to run the tests
        // proxies: {
        //   '/': 'http://localhost:9000/'
        // },
        // URL root prevent conflicts with the site root
        // urlRoot: '_karma_'

        // coverage reporter generates the coverage
        reporters: ['progress', 'coverage'],
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'app/js/**/*.js': ['coverage']
        },
        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        }
    });
};
