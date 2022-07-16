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

const VENDERS = ['tool-box', 'lazyload', 'lib/popper', 'lib/modal']; // base on '_javascript/'

function isDebug() {
  let env = process.env.JEKYLL_ENV;
  return !env == 'production';
}

const BROWSERIFY_CONFIG = {
  paths: `${JS_SRC}/`,
  debug: isDebug()
};

function clean() {
  return del([`${JS_DEST}/*.js`]);
}

function minifyJs() {
  return src(`${ JS_DEST }/*.js`)
    .pipe(uglify())      // to min
    .pipe(dest(JS_DEST));
}

function normalize(bf, output) {
  return bf
    .transform(
      babelify,
      {
        presets:['es2015'], 
        plugins: [
          'babel-plugin-transform-object-rest-spread'
        ]
      }
    )
    .bundle()
    .pipe(source(output))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest(JS_DEST));
}

function concatJs(pattern, output) {
  let files = glob.sync(pattern);
  let config = Object.assign(
    {
      entries: files
    }, 
    BROWSERIFY_CONFIG
  );
  let bf = browserify(config);
  VENDERS.forEach(lib => {
    let libPath = `${JS_SRC}/${lib}.js`;
    // bf = bf.external(libPath);
    bf = bf.exclude(libPath);
  });
  return normalize(bf, output);
}

const commonsJs = () => {
  return concatJs(`${JS_SRC}/commons/*.js`, 'commons');
};

const componentsJs = parallel(
  () => concatJs(`${JS_SRC}/components/theme.js`, 'theme'),
  () => concatJs(`${JS_SRC}/components/aside/toc.js`, 'aside/toc'),
  () => concatJs(`${JS_SRC}/components/sidebar/quicklinks.js`, 'sidebar/quicklinks'),
  () => concatJs(`${JS_SRC}/components/sidebar/actions.js`   , 'sidebar/actions'),
  () => concatJs(`${JS_SRC}/components/pageview/leancloud.js`, 'pageview/leancloud')
);

const layoutsJs = parallel(
  () => concatJs(`${JS_SRC}/layouts/article.js`, 'layouts/article')
);

const vendersJs = () => {
  let config = Object.assign(
    {
    }, 
    BROWSERIFY_CONFIG
  );
  let bf = browserify(config);
  VENDERS.forEach(lib => {
    bf = bf.require(lib); 
  });
  return normalize(bf, 'venders');
};

const buildJs = series(
  clean,
  parallel(commonsJs, vendersJs, componentsJs, layoutsJs)
);

exports.build = series(buildJs, minifyJs);

exports.liveRebuild = () => {
  buildJs();

  watch([
    `${ JS_SRC }/**/*.js`
  ],
  buildJs);
};
