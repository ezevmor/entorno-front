var gulp = require('gulp');
var rename = require('gulp-rename');
var markdownPdf = require('gulp-markdown-pdf');

gulp.task('copy-index',function(){
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./www'))
});

gulp.task('copy-env',function(){
    return gulp.src('./src/env.js')
        .pipe(gulp.dest('./www'))
});

gulp.task('copy-env-prod',function(){
    return gulp.src('./src/env_prod.js')
        .pipe(rename('env.js'))
        .pipe(gulp.dest('./www'))
});

gulp.task('copy-loader',function(){
    return gulp.src('./src/loader.js')
        .pipe(gulp.dest('./www/js'))
});

gulp.task('copy-index-to-folder',function(){
    return gulp.src('./www/index.html')
        .pipe(gulp.dest('./www/gestion-citas'))
});

gulp.task('copy-translations',function(){
    return gulp.src('./src/i18n/**/*')
        .pipe(gulp.dest('./www/i18n'))
});

gulp.task('copy-json',function(){
    return gulp.src('./src/json/**/*.json')
        .pipe(gulp.dest('./www/json'))
});

gulp.task('copy-img',function(){
    return gulp.src('./src/img/*.*')
        .pipe(gulp.dest('./www/img'))
});

gulp.task('copy-media',function(){
    return gulp.src('./src/media/*.*')
        .pipe(gulp.dest('./www/media'))
});

gulp.task('get-fonts',function(){
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

gulp.task('copy-js',function(){
    return gulp.src([
            '!./src/i18n/**/*.js',
            './src/core/app.js',
            '!./src/**.js',
            './src/**/*.js'
        ])
        .pipe(gulp.dest('./www/js'))
});

gulp.task('copy-dist',function(){
    var dateString = Date.now();
    var destinationName = './dist/build-'+dateString+'/';

    return gulp.src('./www/**/*.*')
        .pipe(gulp.dest(destinationName))
});

gulp.task('md',function(){
    gulp.src('README.md')
        .pipe(markdownPdf())
        .pipe(rename('README.pdf'))
        .pipe(gulp.dest('./'))
});