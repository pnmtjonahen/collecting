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



gulp.task('clean', del.bind(null, ['.tmp', './docker/dist']));

gulp.task('flexSlider', function () {
  return gulp.src('./app/bower_components/flexslider/**/*.{eot,ttf,woff,woff2}')
    .pipe($.flatten())
    .pipe(gulp.dest('./docker/dist/css/fonts'));
});
gulp.task('flexSliderSvg', function () {
  return gulp.src('./app/bower_components/flexslider/**/*.svg')
    .pipe($.flatten())
    .pipe(gulp.dest('./docker/dist/svg'));
});
gulp.task('svg', function () {
  return gulp.src('./app/svg/**/*.svg')
    .pipe($.flatten())
    .pipe(gulp.dest('./docker/dist/svg'));
});

gulp.task("partials", function() {
   return gulp.src('app/partials/*.html')
           .pipe($.htmlmin({collapseWhitespace:true}))
            .pipe(gulp.dest('./docker/dist/partials'));
});

gulp.task('html', ['partials', 'svg', 'flexSlider', 'flexSliderSvg'], function() {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('./docker/dist'));
});

gulp.task('build', ['jshint', 'html'], function() {
  return gulp.src('./docker/dist/**/*').pipe($.size({title: 'build', gzip: true}));
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
