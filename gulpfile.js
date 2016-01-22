var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');


//run this task from the terminal with 'gulp scripts'/'gulp' (for 'default')
gulp.task('default', function() {
	//source: files that should be affected by the task
  return gulp.src('src/scripts/*.js')
	// .pipe('do something here')
	//concatenate all the js files into one called bundle.js
	.pipe(concat('bundle.js'))
	//dest: destination where the modified/transformed files will be output
	.pipe(gulp.dest('dist'));
});

gulp.task('browserify', function() {
	//entry point for browserify (will recursively include modules 'require'd by this file)
	browserify('./src/index.js')
	//concatenates all included modules
	.transform()
	.bundle()
	//logs error (if any) using gulp util
	.on('error', function(e){
		gutil.log(e);
	})
	//name of concatenated file that is produced.
	//vinyl-source-stream is used here to output the bundle to gulps pipe stream
	.pipe(source('bundle.js'))
	//destination directory of the file
	.pipe(gulp.dest(''))
});

gulp.task('watch', function() {
	//if any of the given files are changed, run the task(s) in the given array
	gulp.watch('src/scripts/*.js', ['default']);
});
