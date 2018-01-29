import ParamTree from "../paramtree.js";

// Create tree, add functions
const pt = new ParamTree(true);

// Useful for automated testing for groups
// of functions with similar parameter names
let f1 = (ar,num1,num2) => {};
let f2 = (ar,num3,num4) => {};
pt.addFunc(f1);
pt.addFunc(f2);

// { "ar": { "num": { "num": ["Function: f2", "Function: f3"] } } }
console.log(pt.funcTree);
