/* global require, __dirname */

var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var reload = require('browser-sync').reload;
var del = require('del');
var wiredep = require('wiredep').stream;

var postprocessLCOV = function () {
    return  gulp.src("reports/coverage/lcov.info")
            .pipe($.replace("SF:.", "SF:app"))
            .pipe(gulp.dest("reports/coverage"));
    };

gulp.task("test", function () {
    $.karma.start({
        configFile: __dirname + "/karma.conf.js",
        singleRun: true
    }, postprocessLCOV);
});



gulp.task('clean', del.bind(null, ['.tmp', 'dist']));


gulp.task("partials", function() {
   return gulp.src('app/partials/*.html')
           .pipe($.htmlmin({collapseWhitespace:true}))
            .pipe(gulp.dest('dist/partials'));
});

gulp.task('html', ['partials'], function() {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['html'], function() {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
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
