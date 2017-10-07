# ParamTree
Library to sort functions into object trees by their parameter lengths and names

```javascript
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
```

## Installing
`npm install paramtree`

## Main Example
Setup.
```javascript
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
```

Add some functions.
```javascript
// Create a function with named parameters
let f1 = (a) => {};

// Add function with .addFunc
pt1.addFunc(f1);

console.log(pt1.funcTree); // { '1': { a: ["Function: f1"] } }
console.log(pt1.funcTree[1]["a"][0] === f1); // true
```

Add more functions.
```javascript
// Add more functions
let f2 = (b) => {};
pt1.addFunc(f2);

let f3 = (a,b) => {};
pt1.addFunc(f3);

// { '1': { a: ["Function: f1"],
//          b: ["Function: f2"] },
//   '2': { a: { b: "Object" } } }
console.log(pt1.funcTree);
```

Ignore length
```javascript
// The same structure with length ignored
pt2.addFunc(f1);
pt2.addFunc(f2);
pt2.addFunc(f3);

// { a: ["Function: f1", b: ["Function: f3"]],
//   b: ["Function: f2"] }
console.log(pt2.funcTree);
```

Add functions using array
```javascript
pt3.addFunc([f1,f2,f3]);

//{ '1': { a: [ [Function: f1] ], b: [ [Function: f2] ] },
//  '2': { a: { b: [Object] } } }
console.log(pt3.funcTree);
```

## API

### ParamTree
Main class, constructor takes a valid boolean and regex and returns a ParamTree object.
Invalid regexs will throw an error on construction.

#### Construction
```javascript
// Default construction
// igLen = false, regex = /[0-9]/g
const pt1 = new ParamTree();

// Ignore length when forming tree
const pt2 = new ParamTree(true);

// Consider length when forming tree
const pt3 = new ParamTree(false);

// Pass in custom regex
const pt4 = new ParamTree(false, /\*/g);
```
Returns ParamTree object.

#### Computed Properties

##### funcTree
Returns the internal tree of functions.

```javascript
// Construct with default regex
const pt1 = new ParamTree(true);

// Numbers from name will be removed
let f1 = (a1) => {};

// Add function with .addFunc
pt1.addFunc(f1);

// funcTree is a computeted property that returns an internally held object
console.log(pt1.funcTree); // { a: ["Function: f1"] }
```

#### Methods

##### addFunc
Adds a function or array of functions to the internal tree.
Throws error on any input other than function or array of functions.
```javascript
const pt1 = new ParamTree();
const pt2 = new ParamTree();

let f1 = (a) => {};
let f2 = (b) => {};

pt1.addFunc(f1);
pt1.addFunc(f2);

// { '1': { a: ["Function: f1"],
//          b: ["Function: f2"] } }
console.log(pt.funcTree);

// Using array
let f3 = (a) => {};
let f4 = (a) => {};
let f5 = (a) => {};

// Add array of functions using .addFunc
pt.addFunc([f1,f2,f3]);

// { '1': { a: ["Function: f3", "Function: f4", "Function: 5"] } }
console.log(pt.funcTree);
```

## Scripts

#### Testing
To run mocha/chai tests.
`npm run test`

#### Examples
To run the main example.
`npm run ex`

To run all examples.
`npm run exAll`

## License
ParamTree.js is released under the MIT license.
