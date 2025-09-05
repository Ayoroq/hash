export default class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(capacity);
    this.length = 0;
  }


  // This is the hash function
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.capacity;
    }
    return hashCode;
  }

  // The set method to add values to the buckets
  set(key, value) {
    const index = this.hash(key);
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }
    for (let i = 0; i < this.buckets[index].length; i++){
      if (this.buckets[index][i].key === key){
        this.buckets[index][i].value = value;
        return;
      }
    }
    this.buckets[index].push({ key, value });
    this.length++;
    if (this.length / this.capacity >= this.loadFactor) {
      this._resize();
    }
  }

  // The get method to retrieve values from the buckets
  get(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (this.buckets[index]){
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i].key === key) {
          return this.buckets[index][i].value;
        }
      }
    }
    return null;
  }

  // The has method to check whether or not the key is in the hash map.
  has(key){
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (this.buckets[index]){
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i].key === key) {
          return true;
        }
      }
    }
    return false;
  }


  // This method removes an entry if present in the hash map
  remove(key){
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (this.buckets[index]){
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i].key === key) {
          this.buckets[index].splice(i, 1);
          this.length--;
          return true;
        }
      }
    }
    return false;
  }

  getLength(){
    return this.length;
  }

  // This removes all entries in the hash map and resets the length
  clear(){
    this.buckets = new Array(this.capacity);
    this.length = 0;
  }

  // This returns all keys in the hash map
  keys(){
    const keys = [];
    for (let i = 0; i < this.buckets.length; i++){
      if (this.buckets[i]){
        for (let j = 0; j < this.buckets[i].length; j++){
          keys.push(this.buckets[i][j].key);
        }
      }
    }
    return keys;
  }

  // This returns all the values in the hash map
  values(){
    const values = [];
    for (let i = 0; i < this.buckets.length; i++){
      if (this.buckets[i]){
        for (let j = 0; j < this.buckets[i].length; j++){
          values.push(this.buckets[i][j].value);
        }
      }
    }
    return values;
  }

  // This returns all the key value pairs present in the map
  entries(){
    const entries = [];
    for (let i = 0; i < this.buckets.length; i++){
      if (this.buckets[i]){
        for (let j = 0; j < this.buckets[i].length; j++){
          entries.push([this.buckets[i][j].key, this.buckets[i][j].value]);
        }
      }
    }
    return entries;
  }

  // This resize the bucket when the bucket is getting filled
  _resize(){
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.length = 0;
    for (let i = 0; i < oldBuckets.length; i++){
      if (oldBuckets[i]){
        for (let j = 0; j < oldBuckets[i].length; j++){
            this.set(oldBuckets[i][j].key, oldBuckets[i][j].value);
        }
      }
    }
  }
}
