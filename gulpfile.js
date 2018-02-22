'use strict';

var gulp = require('gulp');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var run = require('run-sequence');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var wait = require('gulp-wait');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var rename = require('gulp-rename');

gulp.task('start', function(fn) { //Для разработки 
  run(
  	'clean',
 	'pug',
 	'sass',
 	'scripts',
 	'copy',
 	'images',
 	'symbols',
    'server',
    'watch',   
    fn
  );
});

gulp.task('build', function(fn) { //Для продакшина 
  run(
  	'clean',
 	'pug',
 	'sass',
 	'scripts',
 	'copy',
 	'images',
 	'symbols',       
    fn
  );
});

gulp.task('pug', function() {
	gulp.src('src/pug/pages/*.pug')
		.pipe(plumber())
		.pipe(pug({			
			pretty: '\t',
		}))
		.pipe(gulp.dest('dist'));		
});

gulp.task('sass', function() {
	return gulp.src('src/sass/main.scss')
		.pipe(wait(500))				
		.pipe(plumber())		
		.pipe(sass())
		.pipe(autoprefixer({
			browsers : ['last 2 versions']			
		}))		
		.pipe(gulp.dest('dist/css/'));		
});

gulp.task('scripts', function() {
	gulp.src('src/js/**/*.js')
		.pipe(jshint())
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function() {
  return gulp.src([
    'src/fonts/**/*.{woff,woff2}',
    'src/img/**'    
  ], {
    base: 'src/'
  })
  .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
  return gulp.src('dist/img/**/*.{jpg, png, gif}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
  ]))
  .pipe(gulp.dest('dist/img'));
});

gulp.task('symbols', function() {
  return gulp.src('dist/img/icons/*.svg')
  .pipe(svgmin())
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename('symbols.svg'))
  .pipe(gulp.dest('dist/img'));
});

gulp.task('clean', function() {
	return gulp.src('dist/')
		.pipe(clean());
});

gulp.task('server', function() {
	browserSync.init({		
		server: 'dist',
    	notify: false,
    	open: true,
    	ui: false			
	});
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.pug', ['pug']);
	gulp.watch('src/**/*.scss', ['sass']);
	gulp.watch('src/js/**/*.js', ['scripts']);
	gulp.watch(['src/img/**/*.*', './src/fonts/**/*.*'], ['copy']);
	gulp.watch('src/**/*.*').on('change', browserSync.reload);	
});