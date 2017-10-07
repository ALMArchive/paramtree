"use strict";

const is     = require("is");
const fnArgs = require("function-arguments");

const Privates = Symbol("Privates");

class ParamTree {
   constructor(igLen, regex) {
      this.Privates = {};
      this.Privates.Regex  = /[0-9]/g
      this.Privates.Ignore = false;
      if(igLen === true) this.Privates.Ignore = true;
      if(regex && is.regexp(regex)) this.Privates.Regex = regex;
      this.Privates.FuncTree = {};

      this.Privates._addFunc = function _addFunc(fn) {
         if(!is.fn(fn)) throw new Error("Must pass function to _addFunc");


         // Replace values satisfying regex from parameter name
         // Default is to remove numbers so that num1 and num2 would be the same
         let args = fnArgs(fn).map((elem) => elem.replace(this.Regex, ''));
         let len  = args.length;
         let tmpObj;

         if(!this.Ignore) {
            // If not ignoreLength, set the parameter length as the first level object property
            // Make sure we have an empty object for every parameter length
            if(!this.FuncTree[len]) this.FuncTree[len] = {};

            // Pull out sub tree for the number of parameters of fn
            tmpObj = this.FuncTree[len];
         } else {
            // If ignore length, set first level object to empty object
            tmpObj = this.FuncTree;
         }

         // For each parameter name, if doesn't exist create that subtree
         // in both cases grab the needed subtree in tmpObj
         for(let i = 0; i < len - 1; i ++) {
            if(!tmpObj[args[i]]) tmpObj[args[i]] = {};
            tmpObj = tmpObj[args[i]];
         }

         // Once we are up to the last subtree, if our final parameter
         // doesn't exist on the object, initialize an empty array
         if(!tmpObj[args[len - 1]]) tmpObj[args[len - 1]] = [];

         // Push the function onto the array
         tmpObj[args[len - 1]].push(fn);
      }
   }

   addFunc(fn) {
      if(is.array(fn)) {
         let allFn = fn.filter((e)=>!is.fn(e)).length === 0;
         if(!allFn) throw new Error("Array passed to addFunc must all be array");
         fn.map((elem) => this.Privates._addFunc(elem));
         return;
      }
      if(!is.fn(fn)) throw new Error("Must pass function to addFunc");
      this.Privates._addFunc(fn);
   }

   get funcTree() {
      return this.Privates.FuncTree;
   }
}

module.exports = ParamTree;
