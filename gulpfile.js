const gulp = require('gulp');
const nodemon = require('nodemon');
const debug = require('debug');

gulp.task('default', () => {
  nodemon({
    script: 'app-rest.js',
    ext: 'js',
    env: {
      PORT: 9000,
    },
    ignore: ['./node_modules/**'],
  }).on('restart', () => {
    debug('Nodemon is restarting');
  });
});
