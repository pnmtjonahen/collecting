var gulp = require("gulp");
var karma = require("karma").server;
var replace = require("gulp-replace");

var postprocessLCOV = function() {
    return gulp.src("reports/coverage/lcov.info")
        .pipe(replace("SF:.", "SF:app"))
        .pipe(gulp.dest("reports/coverage"));
};
gulp.task("test", function () {
    karma.start({
        configFile: __dirname + "/karma.conf.js"
    }, postprocessLCOV);
});