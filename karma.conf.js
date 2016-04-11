
module.exports = function (config) {
    "use strict";

    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        // base path, that will be used to resolve files and exclude
        basePath: "app",
        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ["jasmine"],
        // list of files / patterns to load in the browser
        files: [
            "bower_components/showdown/dist/showdown.min.js",
            "bower_components/showdown-table/dist/showdown-table.min.js",
            "bower_components/highlightjs/highlight.pack.js",
            "bower_components/jquery/dist/jquery.min.js",
            "bower_components/flexslider/jquery.flexslider-min.js",
            "bower_components/angular/angular.js",
            "bower_components/angular-material-icons/angular-material-icons.js",
            "bower_components/angular-flexslider/angular-flexslider.js",
            "bower_components/angular-animate/angular-animate.min.js",
            "bower_components/angular-aria/angular-aria.min.js",
            "bower_components/angular-resource/angular-resource.min.js",
            "bower_components/angular-material/angular-material.js",
            "bower_components/angular-sanitize/angular-sanitize.min.js",
            "bower_components/angular-highlightjs/angular-highlightjs.min.js",
            "bower_components/angular-ui-router/release/angular-ui-router.min.js",
            "bower_components/angular-ivonet-markdown/dist/angular-ivonet-markdown.min.js",
            "bower_components/angular-mocks/angular-mocks.js",
            "js/cards/cards.module.js",
            "js/cards/cards.controller.js",
            "js/cards/cards.service.js",
            "js/menu/menu.module.js",
            "js/menu/menu.factory.js",
            "js/menu/menu.link.directive.js",
            "js/menu/menu.toggle.directive.js",
            "js/menu/menu.nospace.filter.js",
            "js/menu/menu.humanize.filter.js",
            "js/components/components.module.js",
            "js/app.module.js",
            "js/app.config.js",
            "js/app.routing.js",
            "js/app.safehtml.filter.js",
            "partials/**/*.html",
            "js/**/*.spec.js"

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
            "PhantomJS"
        ],
        // Which plugins to enable
        plugins: [
            "karma-phantomjs-launcher",
            "karma-jasmine",
            "karma-coverage",
            "karma-junit-reporter",
            "karma-ng-html2js-preprocessor"
        ],
        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,
        colors: true,
        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,
        // Uncomment the following lines if you are using grunt"s server to run the tests
        // proxies: {
        //   "/": "http://localhost:9000/"
        // },
        // URL root prevent conflicts with the site root
        // urlRoot: "_karma_"

        // coverage reporter generates the coverage
        reporters: ["progress", "junit", "coverage"],
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            "js/**/*.js": ["coverage"],
            "partials/**/*.html": "ng-html2js"
        },
        junitReporter: {
            outputFile: "TESTS-xunit.xml",
            outputDir: "../reports/junit"
        },
        // optionally, configure the reporter
        coverageReporter: {
            reporters: [
                {
                    type: "html",
                    dir: "../coverage"
                },
                {
                    type: "lcovonly",
                    dir: "../reports",
                    subdir: "coverage"
                }
            ]
        }
    });
};
