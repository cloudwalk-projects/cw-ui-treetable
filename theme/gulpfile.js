'use strict';

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssmin = require('gulp-cssmin');
var salad = require('postcss-salad')(require('./salad.config.json'));
var rename = require('gulp-rename');

gulp.task('compile', function() {
  return gulp.src('./src/index.css')
    .pipe(postcss([salad]))
    .pipe(cssmin())
    .pipe(rename('treetable.css'))
    .pipe(gulp.dest('../static/styles/cw-ui/'));
});

gulp.task('build', ['compile']);
