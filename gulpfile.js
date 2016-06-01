/* global require, __dirname */

var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var reload = require('browser-sync').reload;
var del = require('del');
var wiredep = require('wiredep').stream;
var Server = require('karma').Server;

var postprocessLCOV = function () {
    return  gulp.src("reports/coverage/lcov.info")
            .pipe($.replace("SF:.", "SF:app"))
            .pipe(gulp.dest("reports/coverage"));
    };

gulp.task("test", function () {
    new Server({
        configFile: __dirname + "/karma.conf.js",
        singleRun: true
    }, postprocessLCOV).start();
});

gulp.task("jshint", function () {
    return gulp.src("./app/js/**/*.js")
            .pipe($.jshint())
            .pipe($.jshint.reporter("default"));
});

gulp.task('sonar', function () {
    var options = {
        sonar: {
            host: {
                url: 'http://localhost:9000'
            },
            jdbc: {
                url: 'jdbc:mysql://localhost:3306/sonar',
                username: 'sonar',
                password: 'sonar'
            },
            projectKey: 'sonar:collecting:1.0.0',
            projectName: 'A Project for Collectors',
            projectVersion: '1.0.0',
            // comma-delimited string of source directories
            sources: 'app/js',
            language: 'js',
            sourceEncoding: 'UTF-8',
            javascript: {
                lcov: {
                    reportPath: 'reports/coverage/lcov.info'
                }
            },
            exec: {
                // All these properties will be send to the child_process.exec method (see: https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback )
                // Increase the amount of data allowed on stdout or stderr (if this value is exceeded then the child process is killed, and the gulp-sonar will fail).
                maxBuffer : 1024*1024
            }
        }
    };

    // gulp source doesn't matter, all files are referenced in options object above
    return gulp.src('*.js', { read: false })
        .pipe($.sonar(options))
        .on('error', $.util.log);
});


gulp.task('clean', del.bind(null, ['.tmp', './dist']));

gulp.task('flexSlider', function () {
  return gulp.src('./app/bower_components/flexslider/**/*.{eot,ttf,woff,woff2}')
    .pipe($.flatten())
    .pipe(gulp.dest('./dist/css/fonts'));
});
gulp.task('flexSliderSvg', function () {
  return gulp.src('./app/bower_components/flexslider/**/*.svg')
    .pipe($.flatten())
    .pipe(gulp.dest('./dist/svg'));
});
gulp.task('svg', function () {
  return gulp.src('./app/svg/**/*.svg')
    .pipe($.flatten())
    .pipe(gulp.dest('./dist/svg'));
});

gulp.task("partials", function() {
   return gulp.src('app/partials/*.html')
           .pipe($.htmlmin({collapseWhitespace:true}))
            .pipe(gulp.dest('./dist/partials'));
});

gulp.task('html', ['partials', 'svg', 'flexSlider', 'flexSliderSvg'], function() {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['jshint', 'html'], function() {
  return gulp.src('./dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});


gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      optional: 'configuration',
      goes: 'here'
    }))
    .pipe(gulp.dest('./app'));
});
