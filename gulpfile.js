/**
 *
 * @type {Gulp|exports|module.exports}
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');

/**
 * Detect errors and potential problems in javascript resourcesa
 */
gulp.task('lint', function () {
    return gulp.src(['**/*.js', '!node_modules/**', '!coverage/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

/**
 * Compile Sass files
 */
gulp.task('sass', function () {
    return gulp.src('./assets/stylesheets/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/stylesheets'));
});

/**
 * Watch Sass files to compile
 */
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

/**
 * TODO: Discuss with team to define tasks according to environment
 */
gulp.task('default', ['lint', 'sass']);
