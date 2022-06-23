class Set {
  
  constructor(data) {
    this.size = 0;
    this._data = [];
    let i;
    if(data.length > 0) {
      for(i=0; i<data.length; i++){
        this.add(data[i]);
      }
    }
  }
  
  add(item) {
    debugger
  }

}

module.exports = {
  Set
};
