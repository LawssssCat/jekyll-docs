class Queue {
  constructor() {
    this.clear();
  }
  clear() {
    this.size=0;
    /*
    {
      data
      next
    }
     */
    this.font = this.end = null;
  }
  enqueue(data) {
    this.size++;
    const node = {
      data: data, 
      next: null
    };
    if(this.font == null) {
      this.font = this.end = node;
    } else {
      this.end = this.end.next = node;
    }
  }
  dequeue() {
    if(this.size>0) {
      this.size--;
      const data = this.font.data;
      this.font = this.font.next;
      if(this.font==null) { // release reference
        this.end=null;
      }
      return data;
    }
    return null;
  }
  
}

module.exports = {
  Queue
};
