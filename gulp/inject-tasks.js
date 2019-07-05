var gulp = require('gulp');
var inject = require('gulp-inject');

gulp.task('inject-files-dev',function(){
    return gulp.src('./www/index.html')
        .pipe(inject(gulp.src( ['./www/js/dependencies.js','./www/js/**/*.js'],{read:false}),{relative:true} ))
        .pipe(inject(gulp.src( ['./www/css/*.css'],{read:false}),{relative:true} ))
        .pipe(gulp.dest('./www'))
});

gulp.task('inject-files-prod',function(){
    return gulp.src('./www/index.html')
        .pipe(inject(gulp.src( './www/js/loader.js',{read:false}),{relative:true} ))
        .pipe(inject(gulp.src( ['./www/css/styles.css'],{read:false}),{relative:true} ))
        .pipe(gulp.dest('./www'))
});

gulp.task('inject-files-valid',function(){
    return gulp.src('./www/index.html')
        .pipe(inject(gulp.src( './www/js/app.min.js',{read:false}),{relative:true} ))
        .pipe(inject(gulp.src( ['./www/css/styles.css'],{read:false}),{relative:true} ))
        .pipe(gulp.dest('./www'))
});