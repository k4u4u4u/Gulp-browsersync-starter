var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();


gulp.task('style', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event 
    return gulp.src('css/**/*.css')
            .pipe(gulp.dest('build'));
   
});


// or... for dynamic server

/*gulp.task('watch', function() {
    browserSync.init({
        proxy: "yourlocal.dev"
    });
});*/ 


// Static server
gulp.task('watch', function() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    watch('./index.html', function () {
     browserSync.reload();
    });	

    watch('./css/*.css', function () {
     gulp.start('cssInject');
    });	
});


gulp.task('cssInject',['style'], function () {
   return gulp.src ('./build/style.css')
    .pipe(browserSync.stream());

});	
