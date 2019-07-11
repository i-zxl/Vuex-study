// 维护一个数据结构，
//最近最新使用放在放到链表尾部，
//超过链表长度，去除最近最少使用的数据
class LRU {
  constructor(max) {
    this.max = max
    this.hashMap = new Map()
    this.Firstkey = null
  }
  add (key, value) {
    if(!key || !value) return 
    if (this.hashMap.has(key)) {
      this.hashMap.delete(key)
    } else {
      if(this.hashMap.size >= this.max) {
        this.Firstkey = this.getFirstkey()
        this.hashMap.delete(this.Firstkey)
      }
    }
    this.hashMap.set(key, value)
    this.Firstkey = this.getFirstkey()
  }
  get (key) {
    let value = this.hashMap.get(key)
    if (!value) return 
    this.add(key, value)
    return value
  }
  del (key) {
    this.hashMap.delete(this.Firstkey)
    this.Firstkey = getFirstkey()
  }
  getFirstkey() {
    return this.hashMap.keys().next().value
  }
}

