import ParamTree from "../paramtree.js";

// Construct with default regex
const pt = new ParamTree();

let f1 = (a1) => {};
let f2 = (a1) => {};
let f3 = (a1) => {};

// Add array of functions using .addFunc
pt.addFunc([f1,f2,f3]);

// { '1': { a: ["Function: f1", "Function: f2", "Function: f3"] } }
console.log(pt.funcTree);
