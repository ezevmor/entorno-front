var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var mainBowerFiles = require('main-bower-files');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var less = require('gulp-less');
var clean = require('gulp-clean');

gulp.task('get-styles',function(cb){
    return runSequence(
        'concat-css-dependencies',
        'concat-less-dependencies',
        'concat-scss-dependencies',
        'concat-scss-styles',
        'concat-styles',
        'delete-pre-css',
        cb
    )
});

gulp.task('concat-css-dependencies',function(){
    return gulp.src(mainBowerFiles('**/*.css'))
        .pipe(sourcemaps.init())
        .pipe(concat('css-dependencies.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./www/pre-css'));
});

gulp.task('concat-less-dependencies',function(){
    return gulp.src(mainBowerFiles('**/*.less'))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('less-dependencies.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./www/pre-css'));
});

gulp.task('concat-scss-dependencies',function(){
    return gulp.src(mainBowerFiles('**/*.scss'))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('sass-dependencies.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./www/pre-css'));
});

gulp.task('concat-scss-styles',function(){
    return gulp.src('./src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('scss-styles.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./www/pre-css'));
});

gulp.task('concat-styles',function(){
    return gulp.src('./www/pre-css/*.css')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./www/css'))
});

gulp.task('delete-pre-css',function(){
    return gulp.src('./www/pre-css/')
        .pipe(clean())
});

gulp.task('sass',function(){
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(cleanCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'))
});