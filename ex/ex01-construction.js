const ParamTree = require("../paramtree.js");

// Default construction
// igLen = false, regex = /[0-9]/g
const pt1 = new ParamTree();

// Ignore length when forming tree
const pt2 = new ParamTree(true);

// Consider length when forming tree
const pt3 = new ParamTree(false);

// Pass in custom regex
const pt4 = new ParamTree(false, /\*/g);
