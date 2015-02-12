var gutil = require('gulp-util');
var gulp = require('gulp');
var tsc = require('gulp-typescript-compiler');
var run = require('gulp-run');

gulp.task('typescript', function(cb) {
    run('tsc.cmd --target ES5 --out freehand.js freehand.ts').exec(cb).on('error', gutil.log);
});

gulp.task('watch', function() {
    gulp.watch('*.ts', ['typescript']);
});

gulp.task('default', ['typescript', 'watch']);
