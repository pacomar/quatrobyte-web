// File: Gulpfile.js
'use strict';
var gulp    = require('gulp'),
	connect = require('gulp-connect'),
	stylus  = require('gulp-stylus'),
	nib     = require('nib'),
	jshint  = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	historyApiFallback = require('connect-history-api-fallback'),
	inject  = require('gulp-inject'),
	templateCache = require('gulp-angular-templatecache'),
	gulpif    = require('gulp-if'),
	minifyCss = require('gulp-minify-css'),
	useref    = require('gulp-useref'),
	uglify    = require('gulp-uglify'),
	uncss = require('gulp-uncss'),
	wiredep = require('wiredep').stream,
	optipng = require('imagemin-optipng'),
	jpegtran = require('imagemin-jpegtran');

// Servidor web de desarrollo
gulp.task('server', function() {
	connect.server({
		root: './app',
		hostname: '0.0.0.0',
		port: 8080,
		livereload: true,
		middleware: function(connect, opt) {
			return [ historyApiFallback ];
		}
	});
});

// Busca errores en el JS y nos los muestra por pantalla
gulp.task('jshint', function() {
  return gulp.src('./app/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// Preprocesa archivos Stylus a CSS y recarga los cambios
gulp.task('css', function() {
	gulp.src('./app/stylesheets/main.styl')
		.pipe(stylus({ use: nib() }))
		.pipe(gulp.dest('./app/stylesheets'))
		.pipe(connect.reload());
});

// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
	gulp.src('./app/**/*.html')
		.pipe(connect.reload());
});


// Busca en las carpetas de estilos y javascript los archivos que hayamos creado
// para inyectarlos en el index.html
gulp.task('inject', function() {
	var sources = gulp.src(['./app/scripts/**/*.js','./app/stylesheets/**/*.css']);
	return gulp.src('index.html', {cwd: './app'})
		.pipe(inject(sources, {
			read: false,
			ignorePath: '/app'
		}))
		.pipe(gulp.dest('./app'));
});

// Inyecta las librerias que instalemos vía Bower
gulp.task('wiredep', function () {
	gulp.src('./app/index.html')
	.pipe(wiredep({
		directory: './app/lib'
	}))
	.pipe(gulp.dest('./app'));
});

gulp.task('watch', function() {
	gulp.watch(['./app/**/*.html'], ['html']);
	gulp.watch(['./app/stylesheets/**/*.styl'], ['css']);
	gulp.watch(['./app/scripts/**/*.js', './Gulpfile.js'], ['jshint']);
	gulp.watch(['./app/stylesheets/**/*.styl'], ['css', 'inject']);
	gulp.watch(['./app/scripts/**/*.js', './Gulpfile.js'], ['jshint', 'inject']);
	gulp.watch(['./bower.json'], ['wiredep']);
});

gulp.task('templates', function() {
	gulp.src('./app/views/**/*.tpl.html')
		.pipe(templateCache({
			root: 'views/',
			module: 'web.templates',
			standalone: true
		}))
		.pipe(gulp.dest('./app/scripts'));
});

gulp.task('compress', function() {
	gulp.src('./app/index.html')
		.pipe(useref.assets())
		.pipe(gulpif('*.js', uglify({mangle: false })))
		.pipe(gulpif('*.css', minifyCss()))
		.pipe(gulp.dest('./dist'));
});

gulp.task('copy', function() {
	gulp.src('./app/index.html')
		.pipe(useref())
		.pipe(gulp.dest('./dist'));
	gulp.src('./app/lib/fontawesome/fonts/**')
		.pipe(gulp.dest('./dist/fonts'));
});

 
gulp.task('build-png', function () {
    gulp.src('./app/img/*.png')
    .pipe(optipng({ optimizationLevel: 3 })())
    .pipe(gulp.dest('./dist/img'));
});
 
gulp.task('build-jpg', function () {
    gulp.src('./app/img/*.jpg')
    .pipe(jpegtran({ progressive: true })())
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('server-dist', function() {
	connect.server({
		root: './dist',
		hostname: '0.0.0.0',
		port: 8080,
		livereload: true,
		middleware: function(connect, opt) {
			return [ historyApiFallback ];
		}
	});
});

gulp.task('uncss', function() {
	gulp.src('./dist/css/style.min.css')
		.pipe(uncss({
			html: ['./app/index.html', './app/views/about.tpl.html', './app/views/contact.tpl.html', 'projects.tpl.html', 'services.tpl.html']
		}))
		.pipe(gulp.dest('./dist/css'));
});


gulp.task('default', ['server', 'inject', 'wiredep', 'watch']);
gulp.task('build', ['templates', 'compress', 'copy', 'uncss', 'build-png', 'build-jpg']);
