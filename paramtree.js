import is from 'is';
import fnArgs from 'function-arguments';

const CLASS_SYMBOL = Symbol('ParamTree Symbol');

export default class ParamTree {
  constructor(igLen, regex) {
    this[CLASS_SYMBOL] = {
      regex: /[0-9]/g,
      ignore: false,
      funcTree: {},
    };

    if (igLen === true) this[CLASS_SYMBOL].ignore = true;
    if (regex && is.regexp(regex)) this[CLASS_SYMBOL].regex = regex;
    this[CLASS_SYMBOL].addFunc = function addFunc(fn) {
      if (!is.fn(fn)) throw new Error('Must pass function to addFunc');
      // Replace values satisfying regex from parameter name
      // Default is to remove numbers so that num1 and num2 would be the same
      const args = fnArgs(fn).map(e => e.replace(this.regex, ''));
      const len = args.length;
      let tmpObj;
      if (!this.ignore) {
        // If not ignoreLength, set the parameter length as the first level object property
        // Make sure we have an empty object for every parameter length
        if (!this.funcTree[len]) this.funcTree[len] = {};
        // Pull out sub tree for the number of parameters of fn
        tmpObj = this.funcTree[len];
      } else {
        // If ignore length, set first level object to empty object
        tmpObj = this.funcTree;
      }
      // For each parameter name, if doesn't exist create that subtree
      // in both cases grab the needed subtree in tmpObj
      // This is effectively recursion if it looks tricky
      for (let i = 0; i < len - 1; i += 1) {
        if (!tmpObj[args[i]]) tmpObj[args[i]] = {};
        tmpObj = tmpObj[args[i]];
      }
      // Once we are up to the last subtree, if our final parameter
      // doesn't exist on the object, initialize an empty array
      if (!tmpObj[args[len - 1]]) tmpObj[args[len - 1]] = [];
      // Push the function onto the array
      tmpObj[args[len - 1]].push(fn);
    };
  }

  addFunc(fn) {
    if (is.array(fn)) {
      const allFn = fn.filter(e => !is.fn(e)).length === 0;
      if (!allFn) throw new Error('Array passed to addFunc must all be array');
      fn.map(e => this[CLASS_SYMBOL].addFunc(e));
      return;
    }
    if (!is.fn(fn)) throw new Error('Must pass function to addFunc');
    this[CLASS_SYMBOL].addFunc(fn);
  }

  get funcTree() {
    return this[CLASS_SYMBOL].funcTree;
  }
}
