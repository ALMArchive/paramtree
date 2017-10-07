const ParamTree = require("../paramtree.js");

const pt = new ParamTree();

let f1 = (a) => {};

// Add function with .addFunc
pt.addFunc(f1);

console.log(pt.funcTree); // { '1': { a: ["Function: f1"] } }
console.log(pt.funcTree[1]["a"][0] === f1); // true

let f2 = (b) => {};
pt.addFunc(f2);

// { '1': { a: ["Function: f1"],
//          b: ["Function: f2"] } }
console.log(pt.funcTree);

let f3 = (a,b) => {};
pt.addFunc(f3);

// { '1': { a: ["Function: f1"],
//          b: ["Function: f2"] },
//   '2': { a: { b: "Object" } } }
console.log(pt.funcTree);
