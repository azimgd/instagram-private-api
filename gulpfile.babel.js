import gulp from 'gulp';
import babel from 'gulp-babel';
import rename from 'gulp-rename';

gulp.task('babel-example', () => {
  return gulp.src('./examples/example.js')
    .pipe(babel())
    .pipe(rename('index.js'))
    .pipe(gulp.dest('./examples'));
});

gulp.task('babel-source', () => {
  return gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./lib'));
});

gulp.task('watch', () => {
  gulp.watch('./examples/example.js', ['babel-example']);
  gulp.watch('./src/**/*.js', ['babel-source']);
});

gulp.task('default', ['watch']);
