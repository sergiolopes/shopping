var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var glob = require('glob');
var fs = require('fs');
var del = require('del');

var dados = require('./src/dados.js');

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

gulp.task('static', function() {
    gulp.src(['./src/js/**/*', './src/img/**/*', './src/icons/**/*', './src/manifest.json', './src/.nojekyll'], {base: './src/'})
        .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function() {
    gulp.src('./src/css/scss/**/*.scss')
        .pipe($.plumber({
            errorHandler: handleError
        }))
        .pipe($.sass().on('error', $.util.log))
        .pipe($.uncss({
            html: ['dist/**/*.html'],
            ignore: [/.*waves.*/, /.*input.*/, /.*toast.*/]
        }))
        .pipe($.autoprefixer())
        .pipe($.cssnano())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    gulp.src(['./src/html/**/*.ejs', '!./src/html/layout/*.ejs'])
        .pipe($.plumber({
            errorHandler: handleError
        }))
        .pipe($.ejs({
            dados: dados
        }, {ext: '.html'}).on('error', $.util.log))
        .pipe(gulp.dest('./dist/'));

    dados.lojas.forEach(function(loja){
       gulp.src('./src/html/layout/loja.ejs')
            .pipe($.plumber({
                errorHandler: handleError
            }))
            .pipe($.ejs({
                loja: loja
            }).on('error', $.util.log))
            .pipe($.rename(loja.url))
            .pipe(gulp.dest('./dist/'));
    });
});

gulp.task('manifest', function(){
  return gulp.src(['dist/**/*.*'])
    .pipe($.appcache({
      hash: true,
      preferOnline: true,
      network: ['*'],
      filename: 'appcache.manifest',
      exclude: ['appcache.manifest', 'service-worker.js'],
      relativePath: './'
     }))
    .pipe(gulp.dest('dist'));
});

gulp.task('filelist', function() {
  return gulp.src(['**/*.*', '!appcache.manifest', '!service-worker.js', '!files.json'], {cwd: 'dist'})
    .pipe($.filelist('files.json'))
    .pipe($.replace('dist/', ''))
    .pipe($.replace('[', 'var files = ['))
    .pipe($.replace(']', '];'))
    .pipe(gulp.dest('dist'));
});

gulp.task('service-worker', ['filelist'], function() {
  return gulp.src(['dist/files.json', 'src/service-worker.js'])
      .pipe($.concat('service-worker.js'))
      .pipe(gulp.dest('dist'));
});

gulp.task('dev-service-worker', function(callback) {
  return gulp.src(['src/service-worker.js'])
      .pipe($.concat('service-worker.js'))
      .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('./src/css/scss/**/*.scss', ['sass']);

    gulp.watch(['./src/js/**/*', './src/img/**/*'], ['static'])
        .on('change', browserSync.reload);

    gulp.watch('./src/html/**/*.ejs', ['html'])
        .on('change', browserSync.reload);
});

gulp.task('sync', function() {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        open: false,
        notify: false
    });
});

gulp.task('clean:manifest', function(cb) {
    del(['dist/appcache.manifest', 'dist/service-worker.js'], cb);
});

gulp.task('clean', function(cb) {
    del(['dist', '.publish'], cb);
});

gulp.task('ghpages', function() {
  return gulp.src('./dist/**/*')
    .pipe($.ghPages());
});

gulp.task('build', $.sequence('html', ['sass', 'static']));
gulp.task('default', ['clean:manifest', 'dev-service-worker', 'build', 'watch', 'sync']);
