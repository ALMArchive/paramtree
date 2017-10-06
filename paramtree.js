"use strict";

const is     = require("is");
const fnArgs = require("function-arguments");

const FuncTreeSymbol = Symbol("FuncTreeSymbol");

class Tree {
   constructor() {
      this.FuncTreeSymbol = {};
   }

   addFunc(fn) {
      if(!is.fn(fn)) throw new Error("Must pass function to addFunc");
      let args = fnArgs(fn).map((elem) => elem.replace(/[0-9]/g, ''));
      let len  = args.length;
      console.log(args);
      console.log(len);
   }
}

let t = new Tree();
console.log(t.addFunc((a,b,c,d) => {}));