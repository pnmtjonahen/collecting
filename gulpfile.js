/* global require, __dirname */

var gulp = require("gulp"),
        karma = require("karma").server,
        replace = require("gulp-replace");


gulp.task("test", function () {
    karma.start({
        configFile: __dirname + "/karma.conf.js",
        singleRun: true
    });
});

gulp.task("process-lcov", function () {
    return  gulp.src("reports/coverage/lcov.info")
            .pipe(replace("SF:.", "SF:app"))
            .pipe(gulp.dest("reports/coverage"));
    });
