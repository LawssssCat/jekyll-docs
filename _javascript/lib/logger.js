const levelMap = {
  'debug': 40,
  'info' : 30,
  'warn' : 20,
  'error': 10
};

class Logger {
  constructor() {
    const mode = window.localStorage.getItem('all_in_one_debug_mode');
    this.logLevel = levelMap[mode] || levelMap['warn'];
  }
  debug(...args) {
    if(this.isDebug()) {
      console.trace('debug', ...args);
    }
  }
  info(...args) {
    if(this.isInfo()) {
      console.trace('info', ...args);
    }
  }
  warn(...args) {
    if(this.isWarn()) {
      console.warn('warn', ...args);
    }
  }
  error(...args) {
    if(this.isError()) {
      console.error('error', ...args);
    }
  }
  isDebug() {
    return levelMap['debug'] <= this.logLevel;
  }
  isInfo() {
    return levelMap['info'] <= this.logLevel;
  }
  isWarn() {
    return levelMap['warn'] <= this.logLevel;
  }
  isError() {
    return levelMap['error'] <= this.logLevel;
  }
}

module.exports = {
  Logger
};
