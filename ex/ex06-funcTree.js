const ParamTree = require("../paramtree.js");

// Construct with default regex
const pt1 = new ParamTree(true);

// Numbers from name will be removed
let f1 = (a1) => {};

// Add function with .addFunc
pt1.addFunc(f1);

// funcTree is a computeted property that returns an internally held object
console.log(pt1.funcTree); // { a: ["Function: f1"] }
