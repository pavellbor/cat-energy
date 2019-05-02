var gulp = require('gulp'),
less = require('gulp-less'),
browserSync = require('browser-sync'),
cssBeautify = require('gulp-cssbeautify'),
plumber = require('gulp-plumber'),
notify = require('gulp-notify'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
csso = require('gulp-csso'),
rename = require('gulp-rename'),
imagemin = require('gulp-imagemin');


gulp.task('normalize', function() {
	return gulp.src('./node_modules/normalize.css/normalize.css')
	.pipe(gulp.dest('./build/css/'));
});

gulp.task('html', function () {
	return gulp.src('./src/*.html')
	.pipe(gulp.dest('./build/'))
	.pipe(browserSync.stream());
});

gulp.task('fonts', function () {
	return gulp.src('./src/fonts/*.{woff,woff2}')
	.pipe(gulp.dest('./build/fonts'))
	.pipe(browserSync.stream());
});

gulp.task('img', function () {
	return gulp.src('./src/img/*')
	.pipe(gulp.dest('./build/img/'))
	.pipe(browserSync.stream());
});

gulp.task('less', function () {
	return gulp.src('./src/less/*.less')
	.pipe(plumber({
		errorHandler: notify.onError("Error: <%= error.message %>")
	}))
	.pipe(less())
	.pipe(gulp.dest('./build/css/'))
	.pipe(browserSync.stream());
});

gulp.task('css', function() {
	return gulp.src('./build/css/*.css')
	.pipe(cssBeautify())
	.pipe(gulp.dest('./build/css/'));
});

gulp.task('js', function () {
	return gulp.src('./src/js/*')
	.pipe(gulp.dest('./build/js/'))
	.pipe(browserSync.stream());
});


gulp.task('server', function () {
	browserSync.init({
		server: {baseDir: './build/'}
	});
});

gulp.task('watch', function () {
	gulp.watch('src/*.html', gulp.series('html'));
	gulp.watch('src/fonts/*.{woff,woff2}', gulp.series('fonts'));
	gulp.watch('src/img/*', gulp.series('img'));
	gulp.watch('src/js/*', gulp.series('js'));
	gulp.watch('src/less/**/*.less', gulp.series('less', 'css'));
});

gulp.task('default', gulp.series(
	gulp.parallel('html', 'img', 'less', 'normalize', 'fonts', 'js'),
	gulp.parallel('watch', 'server')
	));



gulp.task('css-minify', function() {
	return gulp.src('./build/css/style.css')
	.pipe(postcss([
		autoprefixer()
		]))
	.pipe(csso())
	.pipe(rename('style.min.css'))
	.pipe(gulp.dest('./build/css/style.min.css'))
});

gulp.task('img-minify', function() {
	return gulp.src('./build/img/*.{png,jpg,svg}')
	.pipe(imagemin([
		imagemin.optipng({optimizationLevel: 3}),
		imagemin.jpegtran({progressive: true}),
		imagemin.svgo()
		]))
	.pipe(gulp.dest('./build/img/'))
});

gulp.task('build', gulp.series(
	gulp.parallel('html', 'img', 'less', 'normalize', 'fonts', 'js'),
	gulp.parallel('css-minify', 'img-minify')
));



