"use strict";
/* global console */
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
//var jshint = require('gulp-jshint');
var watch = require('gulp-watch');
//var stylish = require('jshint-stylish');
var refresh = require('gulp-livereload');
//var sass = require('gulp-sass');

// livereload
var lr = require('tiny-lr');
var server = lr();

// File sources
var sources = {
  scripts: [
    './src/*.js',
    './src/**/*.js',
  ],
  // css: './src/scss/**/*.scss',
  // sass: './src/scss/app.scss',
  // statics: [
  //   './src/*.html',
  //   './src/static/**/*',
  // ],
  browserify: './src/main.js'
};

// Build destination
var buildDir = './www/assets';

// Tasks
// * build JavaScript (browserify)
// * copy static files
// * lint JavaScript
// * build sass
// * live-reload server
var tasks = {
  scripts: function () {
    gulp.src(sources.browserify)
      .pipe(browserify({
        transform: ['reactify'],
        debug : !gutil.env.production
      }))
      .pipe(gulp.dest(buildDir))
      .pipe(refresh(server));
  },
  // statics: function() {
  //   gulp.src(sources.statics)
  //     .pipe(gulp.dest(buildDir))
  //     .pipe(refresh(server));
  // },
  // lint: function() {
  //   var files = sources.scripts;
  //   files.push('./gulpfile.js');
  //   gulp.src(files)
  //     .pipe(jshint('.jshintrc'))
  //     .pipe(jshint.reporter(stylish));
  // },
  // sass: function() {
  //   gulp.src(sources.sass)
  //     .pipe(sass())
  //     .pipe(gulp.dest(buildDir + 'css/'))
  //     .pipe(refresh(server));
  // },
  livereload: function() {
    server.listen(35729, function(err){
      if(err) {
        return console.log(err);
      }
    });
  }
};

// --------------------------
// Register our tasks
// --------------------------
// default
gulp.task('default', function() {
  // gulp.run('lint:js', 'build:js', 'copy:static');
  gulp.run('build:js');
});
// gulp task setup
gulp.task('build:js', tasks.scripts);
// gulp.task('build:sass', tasks.sass);
// gulp.task('copy:static', tasks.statics);
// gulp.task('lint:js', tasks.lint);
gulp.task('livereload', tasks.livereload);
// development watch & livereload
gulp.task('dev', function() {
  // start the livereload server
  gulp.run('livereload');
  // watch for js changes
  gulp.watch(sources.scripts, function(event) {
    // gulp.run('lint:js', 'build:js');
    gulp.run('build:js');
  });
  // gulp.watch(sources.statics, function(event) {
  //   gulp.run('copy:static');
  // });
  // gulp.watch(sources.css, function(event) {
  //   gulp.run('build:sass');
  // });
});