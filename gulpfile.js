const gulp = require('gulp');

gulp.task('default', function() {
    console.log('waddup');
});

const sass = require('gulp-sass');

gulp.task("styles", function() {
    gulp
      .src("sass/**/*.scss")
      .pipe(sass())
      .on("error", sass.logError)
      .pipe(gulp.dest("./css"));
  });
  