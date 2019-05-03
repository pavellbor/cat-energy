// Подключение плагинов для рабочих плагинов


var gulp = require('gulp');
var	browserSync = require('browser-sync');
var	sourcemaps = require('gulp-sourcemaps');
var	plumber = require('gulp-plumber');
var	notify = require('gulp-notify');
var	sass = require('gulp-sass');
// var	pug = require('gulp-pug');



// Подключение плагинов для продакшена


var	del = require('del');
var autoprefixer = require('gulp-autoprefixer');
var csso = require("gulp-csso");
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var imgCompress = require('imagemin-jpeg-recompress');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;



// Список рабочих тасков


gulp.task('copy:js', function() {
	return gulp.src('source/js/**/*')
	.pipe(gulp.dest('build/js'))
	.pipe(browserSync.stream());
});


gulp.task('copy:fonts', function() {
	return gulp.src('source/fonts/**/*')
	.pipe(gulp.dest('build/fonts'))
	.pipe(browserSync.stream());
});


gulp.task('copy:img', function() {
	return gulp.src('source/img/**/*')
	.pipe(gulp.dest('build/img'))
	.pipe(browserSync.stream());
});


gulp.task('copy:html', function() {
	return gulp.src('source/**/*.html')
	.pipe(gulp.dest('build/'))
	.pipe(browserSync.stream());
});


// gulp.task('pug', function() {
// 	return gulp.src('source/pug/**/*.pug')
// 	.pipe(plumber({
// 		errorHandler: notify.onError(function(err){
// 			return {
// 				title: 'Pug',
// 				message: err.message
// 			}
// 		})
// 	}))
// 	.pipe(sourcemaps.init())
// 	.pipe(pug({
// 		pretty: true
// 	}))
// 	.pipe(sourcemaps.write())
// 	.pipe(gulp.dest('build/'))
// 	.pipe(browserSync.stream());
// });


gulp.task('sass', function() {
	return gulp.src('source/sass/*.scss')
	.pipe(plumber({
		errorHandler: notify.onError(function(err){
			return {
				title: 'Sass',
				message: err.message
			}
		})
	}))
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'expanded'}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('build/css/'))
	.pipe(browserSync.stream());
});


gulp.task('browserSync', function () {
	browserSync.init({
		server: {baseDir: 'build'}
	});

	// gulp.watch('source/pug/**/*.pug', gulp.series('pug'));
	gulp.watch('source/sass/**/*', gulp.series('sass'));
	gulp.watch('source/**/*.html', gulp.series('copy:html'));
	gulp.watch('source/fonts/**/*', gulp.series('copy:fonts'));
	gulp.watch('source/img/**/*', gulp.series('copy:img'));
	gulp.watch('source/js/**/*', gulp.series('copy:js'));
});


gulp.task('default', gulp.series(
	gulp.parallel('copy:js', 'copy:fonts', 'copy:img', 'copy:html', 'sass'),
	gulp.parallel('browserSync')
));



// Список тасков для продакшена


gulp.task('del:build', function() {
	return del('build');
})


gulp.task('sass:build', function() {
	return gulp.src('source/sass/*.scss')
	.pipe(sass())
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(csso())
	.pipe(gulp.dest('build/css/'))
	.pipe(browserSync.stream());
});


// gulp.task('pug:build', function() {
// 	return gulp.src('source/**/*.pug')
// 	.pipe(pug())
// 	.pipe(htmlmin({
// 		collapseWhitespace: true,
// 		removeComments: true
// 	}))
// 	.pipe(gulp.dest('build'))
// 	.pipe(browserSync.stream());
// });


gulp.task('img:build', function() {
	return gulp.src('source/img/**/*')
	.pipe(imagemin([
		imgCompress({
			loops: 4,
			min: 70,
			max: 80,
			quality: 'high'
		}),
		imagemin.gifsicle(),
		imagemin.optipng(),
		imagemin.svgo()
		]))
	.pipe(gulp.dest('build/img'))
	.pipe(browserSync.stream());
});


gulp.task('js:build', function () {
  return pipeline(
        gulp.src('js/**/*'),
        uglify(),
        gulp.dest('build/js')
  );
});


gulp.task('browserSync:build', function() {
	browserSync.init({
		server: {baseDir: 'build'}
	});
});


gulp.task('build', gulp.series(
	gulp.parallel('js:build', 'copy:fonts', 'copy:html', 'img:build', 'sass:build'),
	gulp.parallel('browserSync:build')
));