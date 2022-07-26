const lazyload = require('lazyload');
const logger = require('logger');
const sources = window.VARIABLES.sources;

const css = [sources.font_awesome];

lazyload.css(css, () => {
  logger.isDebug() && logger.debug('sources.js', 'load ok!', css);
});
