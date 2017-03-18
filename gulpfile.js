var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var jsonServer = require('json-server');
var Karma = require('karma').Server;
var ngAnnotate = require('gulp-ng-annotate');
var path = require('path');
var partialify = require('partialify');
var proxy = require('http-proxy-middleware');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var watchify = require('watchify');

function logError(error) {
  gutil.beep();

  if (error._babel) {
    gutil.log(
      gutil.colors.red(error.name)
      + ': ' + gutil.colors.yellow(error.message)
      + '\n' + error.codeFrame
    );
  } else {
    gutil.log(gutil.colors.red(error.message));
  }

  this.emit('end');
}

gulp.task('scripts', function() {
  var bundler = watchify(browserify('./src/app.js', {
    debug: true,
    paths: ['../node_modules', './src'],
  }))
    .transform(babelify, {
      presets: ['es2015'],
    })
    .transform(partialify);

  function rebundle() {
    bundler.bundle()
      .on('error', logError)
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(ngAnnotate())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./.tmp'))
      .pipe(browserSync.stream());
  }

  bundler.on('update', rebundle);

  return rebundle();
});

gulp.task('watch', ['scripts'], function() {
  gulp.watch('src/index.html').on('change', browserSync.reload);
});

gulp.task('json-server', function() {
  jsonServer.create()
    .use(jsonServer.defaults())
    .use(jsonServer.router('db.json'))
    .listen(3030)
});

gulp.task('serve', ['watch', 'json-server'], function() {
  var jsonServerProxy = proxy('/api', {
    target: 'http://localhost:3030',
    pathRewrite: {'^/api': ''},
  });

  browserSync.init({
    middleware: [jsonServerProxy],
    online: false,
    server: ['src', '.tmp'],
  });
});

gulp.task('test', function(done) {
  new Karma({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: true,
    autoWatch: false,
    reporters: ['dots'],
  }, done).start();
});

gulp.task('test:tdd', function(done) {
  new Karma({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: false,
    autoWatch: true,
    reporters: ['dots'],
  }, done).start();
});

gulp.task('default', ['serve']);
