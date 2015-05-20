/**
 * Created by Administrator on 2015/5/12.
 */
var gulp = require('gulp')
  , sourcemaps = require('gulp-sourcemaps')
  , sass = require('gulp-sass')
  , uglify = require('gulp-minify-css')
  , prefix = require('gulp-autoprefixer')
  , mainBowerFiles = require('main-bower-files')
  ;

gulp.task('sass', function(){
  gulp.src('./src/style/sass/app/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
//      sourceMap: true
    }).on('error', sass.logError))
//    .pipe(prefix())
//    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./bin/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/style/sass/app/*.scss', ['sass']);
});

gulp.task('html', function(){
  gulp.src('./src/template/app/*.html')
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./bin/html'));
});

gulp.task('lib', function(){
  gulp.src(mainBowerFiles())
//    .pipe(uglify())
    .pipe(gulp.dest('./bin/js/lib'));
});

gulp.task('test', function(){
  gulp.src('./src/script/test/*')
    .pipe(gulp.dest('./test_bin/'));
});

gulp.task('copy', function(){
  gulp.src('./**/*')
    .pipe(gulp.dest('../web.copy/'));
});

gulp.task('build', ['sass', 'html']);