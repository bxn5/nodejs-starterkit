process.env.NODE_ENV = "development";

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('server:nodemon', function() {
  return nodemon({
    script: 'index',
    watch: [
      'server/**/*.js'
      ]
    }).on('restart', function () {
      console.log('File change found. Restarting the server.');
  });
});

gulp.task('server', [
  'server:nodemon'
])

gulp.task('default', ['server']);