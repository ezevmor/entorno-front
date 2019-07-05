var gulp = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var wait = require('gulp-wait');
var clean = require('gulp-clean');

require('./gulp/copy-tasks');
require('./gulp/styles-tasks');
require('./gulp/sources-tasks');
require('./gulp/inject-tasks');


//lanza la aplicacion para desarrollo con browsersync
gulp.task('default',function(cb){
  browserSync.init({
  	server: 'www/'
  });
  return runSequence('dev','watch',cb)
});

//lanza la aplicacion para desarrollo
gulp.task('dev',function(cb){
  return runSequence(
    'clean-folders',
    'copy-index',
    'copy-env',
    'copy-img',
    'copy-media',
    'copy-translations',
    'copy-json',
    'sass',
    'get-dependencies-dev',
    'copy-js',
    'inject-files-dev',
    'reload-browser',
    cb
  )
});

//comprueba que el codigo actual puede minificarse y se lanza la aplicacion
gulp.task('valid',function(cb){
  return runSequence(
    'clean-folders',
    'copy-index',
    'copy-env',
    'copy-img',
    'copy-media',
    'copy-translations',
    'copy-json',
    'concat-js',
    'get-fonts',
    'get-styles',
    'inject-files-valid',
    'open-server',
    cb
  )
});

//crea una distribucion minificada en la carpeta dist
gulp.task('prod',function(cb){
	return runSequence(
    'clean-folders',
    'copy-index',
    'copy-env-prod',
    'copy-loader',
    'copy-img',
    'copy-media',
    'copy-translations',
    'concat-js',
    'concat-js-mapped',
    'get-fonts',
    'get-styles',
    'inject-files-prod',
    'copy-index-to-folder',
    'copy-dist',
    cb
  )
});


gulp.task('clean-folders',function(){
  return gulp.src(['./www/'],{read:false})
    .pipe(clean({force:true}))
});

gulp.task('reload-browser',function(){
  return gulp.src('')
  	.pipe(wait(500))
  	.pipe(browserSync.stream());
});

gulp.task('open-server',function(){
  return browserSync.init({
    server: 'www/',
    port: 4000
  })
});

gulp.task('watch', function() {
  gulp.watch(
    [
      './src/**/*.js',
      './src/**/*.json',
      './src/**/*.html',
      './src/**/*.scss',
      './src/**/*.css',
      './scss/*.scss'
    ],
    ['dev']
  );
});
