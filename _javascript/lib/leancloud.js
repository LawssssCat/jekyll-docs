// see https://leancloud.cn/docs/leanstorage_guide-js.html
// open debug mode 
// localStorage.setItem('debug', 'leancloud*');

class Pageview {
  constructor(_AV, options) {
    this.AV = _AV;
    this.appId = options.appId;
    this.appKey = options.appKey;
    this.appClass = options.appClass;

    this.AV.init({
      // todo serverURL
      appId: this.appId,
      appKey: this.appKey
    });
  }
  search(key) {
    const query = new this.AV.Query(this.appClass);
    query.equalTo('key', key);
    return query.first();
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
