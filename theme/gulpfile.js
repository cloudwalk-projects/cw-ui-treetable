'use strict';

var gulp = require('gulp');
var sequence = require('gulp-sequence')
var postcss = require('gulp-postcss');
var cssmin = require('gulp-cssmin');
var salad = require('postcss-salad')(require('./salad.config.json'));
var rename = require('gulp-rename');
var fs = require('fs');

gulp.task('compile-light', function() {
  // 读取浅色主题配置信息
  fs.writeFileSync('./src/common/var.css', fs.readFileSync('./config/theme-light.css'));
  return gulp
    .src('./src/index.css')
    .pipe(postcss([salad]))
    .pipe(cssmin())
    .pipe(rename('treetable-light.css'))
    .pipe(gulp.dest('../static/styles/cw-ui/'));
});

gulp.task('compile-dark', function() {
  // 读取深色主题配置信息
  fs.writeFileSync('./src/common/var.css', fs.readFileSync('./config/theme-dark.css'));
  return gulp
    .src('./src/index.css')
    .pipe(postcss([salad]))
    .pipe(cssmin())
    .pipe(rename('treetable-dark.css'))
    .pipe(gulp.dest('../static/styles/cw-ui/'));
});

gulp.task('build', sequence('compile-light', 'compile-dark'));
// gulp.task('build', ['compile-light']);
