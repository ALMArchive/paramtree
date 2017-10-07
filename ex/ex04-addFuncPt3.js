const ParamTree = require("../paramtree.js");

// Construct with ignoreLength true
const pt1 = new ParamTree(true);

// Numbers from name will be removed
let f1 = (a1) => {};

// Add function with .addFunc
pt1.addFunc(f1);

console.log(pt1.funcTree); // { a: ["Function: f1"] }

const pt2 = new ParamTree(true);

// Useful for automated testing for groups
// of functions with similar parameter names
let f2 = (ar,num1,num2) => {};
let f3 = (ar,num3,num4) => {};
pt2.addFunc(f2);
pt2.addFunc(f3);

// {"ar": {"num":{"num":["Function: f2", "Function: f3"]}}}
console.log(pt2.funcTree);
