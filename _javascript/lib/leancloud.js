// see https://leancloud.cn/docs/leanstorage_guide-js.html
// open debug mode 
// localStorage.setItem('debug', 'leancloud*');

class Pageview {
  constructor(_AV, options) {
    this.AV = _AV;
    let config = {};
    this.appId = config.appId = options.appId;
    this.appKey = config.appKey = options.appKey;
    if(options.serverUrl) {
      this.serverUrl = config.serverUrl = options.serverUrl;
    }
    this.appClass = options.appClass;

    this.AV.init(config);
  }
  search(key) {
    const query = new this.AV.Query(this.appClass);
    query.equalTo('key', key);
    return query.first();
  }
  searchBatch(keys) {
    const queryList = new Array(keys.length);
    keys.forEach((key, index) => {
      const query = new this.AV.Query(this.appClass);
      query.equalTo('key', key);
      queryList[index] = query;
    });
    return this.AV.Query
      .or(...queryList)
      .find();
  }
  insert(key, title, views=0) {
    const PV = this.AV.Object.extend(this.appClass);
    const _pv = new PV();
    _pv.set('title', title);
    _pv.set('key', key);
    _pv.set('views', views);
    return _pv.save();
  }
  increment(pv) {
    pv.increment('views', 1);
    return pv.save();
  }
  queryBatch(keys, callback) {
    return this.searchBatch(keys)
      .then((result) => {
        callback && callback(result);
      });
  }
  increase(key, title, callback) {
    return this.search(key)
      .then(result => {
        if(result) {
          return this.increment(result);
        } else {
          return this.insert(key, title, 0)
            .then((pv) => {
              return this.increment(pv);
            });
        }
      })
      .then((pv) => {
        return callback && callback(pv.attributes.views);
      });
  }
}

module.exports = {
  Pageview
};
