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
var browserSync = require('browser-sync').create();

gulp.task('dev', function(fn) {
  run(
  	'clean',
 	'pug',
 	'sass',
 	'scripts',
 	'copy',
    'server',
    'watch',   
    fn
  );
});

gulp.task('production', function(fn) {
  run(
  	'clean',
 	'pug',
 	'sass',
 	'scripts',
 	'copy',       
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

gulp.task('clean', function() {
	return gulp.src('dist/')
		.pipe(clean());
})

gulp.task('server', function() {
	browserSync.init({
		open: false,		   			
		server: {
			baseDir: './dist'			
		}				
	});
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.pug', ['pug']);
	gulp.watch('src/**/*.scss', ['sass']);
	gulp.watch('src/js/**/*.js', ['scripts']);
	gulp.watch(['./src/img/**/*.*', './src/fonts/**/*.*'], ['assets']);
	gulp.watch('src/**/*.*').on('change', browserSync.reload);	
});