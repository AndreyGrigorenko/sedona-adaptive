'use strict';

var gulp = require('gulp');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var run = require('run-sequence');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

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
	gulp.watch('src/**/*.*').on('change', browserSync.reload);	
});


gulp.task('default', function(fn) {
  run(
 	'pug',
    'server',
    'watch',   
    fn
  );
});