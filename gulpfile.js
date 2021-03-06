var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var run = require('gulp-run');

var paths = {
  sass: ['./scss/**/*.scss'],
  js: ['./www/js/*.js', './www/js/**/*.js', '!./www/js/quest.js', '!./www/js/quest.min.js']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('start', function () {
  nodemon({
    script: 'server.js'
    , ext: 'js html'
    , env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('concat', function() {
  return gulp.src([
    './www/js/app.js',

    './www/js/controllers/controllers.js',
    './www/js/factories/factories.js',
    './www/js/services/services.js',

    './www/js/controllers/questController.js',
    './www/js/controllers/adminController.js',

    './www/js/factories/Quest.js',
    './www/js/factories/Result.js',

    './www/js/services/pouchService.js',
    './www/js/services/ipService.js'
  ])
    .pipe(concat('quest.js'))
    .pipe(gulp.dest('./www/js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./www/js'));
});

gulp.task('watchjs', function() {
  gulp.watch(paths.js, ['concat']);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
