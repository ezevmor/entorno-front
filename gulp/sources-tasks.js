var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var less = require('gulp-less');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');

gulp.task('get-dependencies-dev',function(cb){
    return runSequence(
        'concat-js-dependencies-dev',
        'concat-css-dev',
        'concat-less-dev',
        'concat-sass-dev',
        'get-fonts-dev',
        cb
    )
});

gulp.task('concat-js-dependencies-dev',function(){
    var sourceList = [];
    sourceList = mainBowerFiles('**/*.js');
    sourceList.push('./custom-dependencies/*.js');

    return gulp.src(sourceList)
        .pipe(sourcemaps.init())
        .pipe(concat('dependencies.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./www/js'));
});

gulp.task('concat-css-dev',function(){
    return gulp.src(mainBowerFiles('**/*.css'))
        .pipe(sourcemaps.init())
        .pipe(concat('css-dependencies.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./www/css'));
});

gulp.task('concat-less-dev',function(){
    return gulp.src(mainBowerFiles('**/*.less'))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('less-dependencies.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./www/css'));
});

gulp.task('concat-sass-dev',function(){
    gulp.src(mainBowerFiles('**/*.scss'))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('sass-dependencies.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./www/css'));
});

gulp.task('get-fonts-dev',function(){
    return gulp.src([
            './bower_components/**/*.otf',
            './bower_components/**/*.eot',
            './bower_components/**/*.svg',
            './bower_components/**/*.ttf',
            './bower_components/**/*.woff',
            './bower_components/**/*.woff2'
        ])
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('./www/fonts/'))
});


gulp.task('concat-js',function(){
    var sourceList = [];
    sourceList = mainBowerFiles('**/*.js');
    sourceList.push('./custom-dependencies/*.js');
    sourceList.push('./src/**/*.js');

    return gulp.src(sourceList)
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./www/js'));
});

gulp.task('concat-js-mapped',function(){
    var sourceList = [];
    sourceList = mainBowerFiles('**/*.js');
    sourceList.push('./custom-dependencies/*.js');
    sourceList.push('./src/**/*.js');

    return gulp.src(sourceList)
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.mapped.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./www/js'));
});