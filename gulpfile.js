var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
// var concat = require('gulp-concat'); //not currently a dependency, but may need later
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');


var scriptsDir = './src/scripts/';
var buildDir = './dist/scripts/';

function buildScript(entryFile, watch) {
  var props = {
		entries: [scriptsDir + entryFile],
		debug: true,
    cache: {},
    packageCache: {},
	};
  var bundler = watch ? watchify(browserify(props)) : browserify(props);
  bundler.transform(babelify, {presets: ["react"]});
  function rebundle() {
    var stream = bundler.bundle();
    return stream.on('error', function(e){
			gutil.log(e);
		})
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(buildDir));
  }
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });
  return rebundle();
}

gulp.task('build', function() {
	return buildScript('main.js', false);
});

gulp.task('sass', function(){
  return gulp.src('./src/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/styles'))
});

gulp.task('default', function() {
  gulp.watch('./src/styles/*.scss', ['sass']);
	return buildScript('main.js', true);
});
