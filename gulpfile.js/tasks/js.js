#!/usr/bin/env node

'use strict';

const { src, dest, watch, series, parallel } = require('gulp');

const del    = require('del');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const glob   = require('glob');
const babelify   = require('babelify');
const source     = require('vinyl-source-stream');
const browserify = require('browserify');

const JS_SRC = '_javascript';
const JS_DEST = 'assets/js/dist';

function isDebug() {
  let env = process.env.JEKYLL_ENV;
  return !env == 'production';
}

function clean() {
  return del([`${JS_DEST}/*.js`]);
}

function minifyJs() {
  return src(`${ JS_DEST }/*.js`)
    .pipe(uglify())      // to min
    .pipe(dest(JS_DEST));
}

function normalize(stream) {
  return stream
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest(JS_DEST));
}

function concatJs(pattern, output) {
  let files = glob.sync(pattern);
  let stream = browserify(
    { 
      entries: files, 
      debug: isDebug()
    })
    .transform(
      babelify,
      {
        presets:['es2015']
      }
    )
    .bundle()
    .pipe(source(output));
  return normalize(stream);
}

const commonsJs = () => {
  return concatJs(`${JS_SRC}/commons/*.js`, 'commons');
};

const componentsJs = parallel(
  () => concatJs(`${JS_SRC}/components/theme.js`, 'theme'),
  () => concatJs(`${JS_SRC}/components/aside/*.js`, 'aside')
);

const toolBoxJs = () => {
  return concatJs(`${JS_SRC}/tool-box.js`, 'tool-box');
};

const lazyLoadJs = () => {
  return concatJs(`${JS_SRC}/lazyLoad.js`, 'lazyLoad');
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
