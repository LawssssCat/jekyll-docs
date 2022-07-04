class Stack {
  constructor(arr) {
    this.arr = arr || [];
  }
  size() {
    return this.arr.length;
  }
  pop() {
    return this.arr.pop();
  }
  push(item) {
    return this.arr.push(item);
  }
  first() {
    if(this.arr.length>0) {
      return this.arr[0];
    }
  }
  last() {
    if(this.arr.length>0) {
      return this.arr[this.arr.length-1];
    }
  }
}
module.exports = {
  Stack
};
