#!/usr/bin/env node

'use strict';

const { src, dest, watch, series, parallel} = require('gulp');

const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

const JS_SRC = '_javascript';
const JS_DEST = 'assets/js/dist';

function minifyJs() {
  return src(`${ JS_DEST }/*.js`)
    .pipe(uglify())
    .pipe(dest(JS_DEST));
}

function concatJs(files, output) {
  return src(files)
    .pipe(concat(output))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest(JS_DEST));
}

const commonsJs = () => {
  return concatJs(`${JS_SRC}/commons/*.js`, 'commons');
};

const buildJs = parallel(commonsJs);

exports.build = series(buildJs, minifyJs);

exports.liveRebuild = () => {
  buildJs();

  watch([
    `${ JS_SRC }/**/*.js`
  ],
  buildJs);
};
