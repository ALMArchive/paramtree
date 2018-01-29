import ParamTree from "../paramtree.js";

// Construct with ignoreLength = true
const pt = new ParamTree(true);

let f1 = (a) => {};

// Add function with .addFunc
pt.addFunc(f1);

console.log(pt.funcTree); // { a: ["Function: f1"] }
console.log(pt.funcTree["a"][0] === f1); // true

let f2 = (b) => {};
pt.addFunc(f2);

console.log(pt.funcTree); // { a: ["Function: f1"],
                          //   b: ["Function: f2"] }

let f3 = (a,b) => {};
pt.addFunc(f3);

console.log(pt.funcTree); // { a: ["Function: f1", b: ["Function: f3"]],
                          //   b: ["Function: f2"] }

// Add another function with a as parameter
let f4 = (a) => {};
pt.addFunc(f4);

// { a: ["Function: f1", "Function: f4", b: ["Function: f3"]],
//   b: ["Function: f2"] }
console.log(pt.funcTree);
