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
    let i, data = this._data;
    for (i=0; i<data.length; i++) {
      if(data[i] == item) {
        return false;
      }
    }
    this.size++;
    data.push(item);
    return true;
  }

  get(index) {
    return this._data[index];
  }

  has(item) {
    let i, data = this._data;
    for (i=0; i<data.length; i++) {
      if(data[i] == item) {
        return true;
      }
    }
    return false;
  }

  values() {
    return this._data;
  }

  is(set) {
    if(set == this) return true;
    if(set == null) return false;
    if(set.size != this.size) return false;
    
    let i, j, myValue, itValue, flag;
    for(flag=false, i=0; i<set.size; i++) {
      itValue = set.get(i);
      for(j=0; j<this.size; j++) {
        myValue = this.get(j);
        if( myValue == itValue ) {
          flag = true;
          break;
        }
      }
      if(flag == false) return false;
    }
    return true;
  }

}

module.exports = {
  Set
};
