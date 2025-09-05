import HashMap from "./hash.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.get("apple"));
console.log(test.get("banana"));
console.log(test.get("carrot"));
test.set("dog", "black");
console.log(test.get("dog"));
console.log(test.entries());
console.log(test.keys());
console.log(test.values());
console.log(test.has("apple"));

