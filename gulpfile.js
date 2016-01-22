var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');

var scriptsDir = './src/scripts/';
var buildDir = './src/dist/scripts/';

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

gulp.task('default', function() {
	return buildScript('main.js', true);
});
