class Logger {
  constructor() {
    this.isDebugFlag = false;
    const mode = window.localStorage.getItem('all_in_one_debug_mode');
    if(mode) {
      this.isDebugFlag = true;
    }
  }
  info(...args) {
    console.trace('info', ...args);
  }
  error(...args) {
    console.error('error', ...args);
  }
  isDebug() {
    return this.isDebugFlag;
  }
  debug(...args) {
    if(this.isDebug()) {
      console.trace('debug', ...args);
    }
  }
}

module.exports = {
  Logger
};
