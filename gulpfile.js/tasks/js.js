#!/usr/bin/env node

'use strict';

const { src, dest, watch, series, parallel} = require('gulp');

const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const babel  = require('gulp-babel');
const browserify = require('gulp-browserify');

const JS_SRC = '_javascript';
const JS_DEST = 'assets/js/dist';

function minifyJs() {
  return src(`${ JS_DEST }/*.js`)
    .pipe(uglify())      // to min
    .pipe(dest(JS_DEST));
}

function concatJs(files, output) {
  return src(files)
    .pipe(concat(output)) // concat 
    .pipe(browserify())   // require
    .pipe(babel())        // to es5
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest(JS_DEST));
}

const commonsJs = () => {
  return concatJs(`${JS_SRC}/commons/*.js`, 'commons');
};

const toolBoxJs = () => {
  return concatJs(`${JS_SRC}/utils/tool-box.js`, 'tool-box');
};

const lazyLoadJs = () => {
  return concatJs(`${JS_SRC}/lib/lazyLoad.js`, 'lazyLoad');
};

const buildJs = parallel(commonsJs, toolBoxJs, lazyLoadJs);

exports.build = series(buildJs, minifyJs);

exports.liveRebuild = () => {
  buildJs();

  watch([
    `${ JS_SRC }/**/*.js`
  ],
  buildJs);
};
