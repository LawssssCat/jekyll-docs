#!/usr/bin/env node

'use strict';

const { src, dest, watch, series, parallel} = require('gulp');

const del    = require('del');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const babel  = require('gulp-babel');
const browserify = require('gulp-browserify');

const JS_SRC = '_javascript';
const JS_DEST = 'assets/js/dist';

function clean() {
  return del([`${JS_DEST}/*.js`]);
}

function minifyJs() {
  return src(`${ JS_DEST }/*.js`)
    .pipe(uglify())      // to min
    .pipe(dest(JS_DEST));
}

function normalize(src) {
  return src
    .pipe(browserify())   // require
    .pipe(babel())        // to es5
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest(JS_DEST));
}

function moveJs(files) {
  return normalize(
    src(files)
  );
}

function concatJs(files, output) {
  return normalize(
    src(files).pipe(concat(output)) // concat 
  );
}

const commonsJs = () => {
  return concatJs(`${JS_SRC}/commons/*.js`, 'commons.js');
};

const componentsJs = () => {
  return moveJs(`${JS_SRC}/components/*.js`);
};

const toolBoxJs = () => {
  return concatJs(`${JS_SRC}/tool-box.js`, 'tool-box.js');
};

const lazyLoadJs = () => {
  return concatJs(`${JS_SRC}/lazyLoad.js`, 'lazyLoad.js');
};

const buildJs = series(
  clean,
  parallel(commonsJs, toolBoxJs, lazyLoadJs, componentsJs)
);

exports.build = series(buildJs, minifyJs);

exports.liveRebuild = () => {
  buildJs();

  watch([
    `${ JS_SRC }/**/*.js`
  ],
  buildJs);
};
