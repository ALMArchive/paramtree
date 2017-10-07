const ParamTree = require("../paramtree.js");

// There are three ways to construct ParamTree

// Default construction
// igLen = false, regex = /[0-9]/g
const pt1 = new ParamTree();

// Ignore length when forming tree
const pt2 = new ParamTree(true);

// Consider length when forming tree
const pt3 = new ParamTree(false);

// Pass in custom regex
const pt4 = new ParamTree(false, /\*/g);

// Create a function with named parameters
let f1 = (a) => {};

// Add function with .addFunc
pt1.addFunc(f1);

console.log(pt1.funcTree); // { '1': { a: ["Function: f1"] } }
console.log(pt1.funcTree[1]["a"][0] === f1); // true

// Add more functions
let f2 = (b) => {};
pt1.addFunc(f2);

let f3 = (a,b) => {};
pt1.addFunc(f3);

// { '1': { a: ["Function: f1"],
//          b: ["Function: f2"] },
//   '2': { a: { b: "Object" } } }
console.log(pt1.funcTree);

// The same structure with length ignored
pt2.addFunc(f1);
pt2.addFunc(f2);
pt2.addFunc(f3);

// { a: ["Function: f1", b: ["Function: f3"]],
//   b: ["Function: f2"] }
console.log(pt2.funcTree);

// Add functions using array
pt3.addFunc([f1,f2,f3]);

//{ '1': { a: [ [Function: f1] ], b: [ [Function: f2] ] },
//  '2': { a: { b: [Object] } } }
console.log(pt3.funcTree);
