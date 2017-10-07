"use strict"

const chai = require("chai");
const is   = require("is");
const ParamTree = require("../paramtree.js");
const passIns = ["",1,()=>{},[],{},null,undefined,Symbol("")];

describe("ParamTree", function() {
   describe("construction", function() {
      it("Should return ParamTree after construction", function() {
         let pt = new ParamTree();
         chai.expect(pt.constructor.name === "ParamTree").to.be.true;
      });
      it("FuncTree should be empty after construction", function() {
         let pt = new ParamTree();
         chai.expect(Reflect.ownKeys(pt.funcTree).length).to.equal(0);
      });
      it("Constructing with true as first parameter will ignore parameter length.", function() {
         let pt = new ParamTree(true);
         pt.addFunc((a) => {});
         pt.addFunc((a,b) => {});
         let funcTree = pt.funcTree;
         chai.expect(Reflect.has(funcTree, 1)).to.be.false;
         chai.expect(Reflect.has(funcTree, 2)).to.be.false;
         chai.expect(Reflect.has(funcTree, "a")).to.be.true;
         chai.expect(Reflect.has(funcTree["a"], "b")).to.be.true;
      });
      it("Constructing with regex as second parameter will remove those elements from parameter name", function() {
         let pt = new ParamTree(true, /[0-9]/g);
         pt.addFunc((a1) => {});
         pt.addFunc((a1,b2) => {});
         let funcTree = pt.funcTree;
         chai.expect(Reflect.has(funcTree, "a")).to.be.true;
         chai.expect(Reflect.has(funcTree["a"], "b")).to.be.true;
      });
   });
   describe("addFunc", function() {
      it("Should throw error when anything other than function or array is passed", function() {
         let pt = new ParamTree();
         passIns.filter((elem) => !(is.fn(elem) ||  is.array(elem)))
                .map((elem) => chai.expect(() => pt.addFunc(elem)).to.throw(Error));
      });
      it("Should throw error when passed an array of anying other than function", function() {
         let pt = new ParamTree();
         passIns.filter((elem) => !is.fn(elem))
                .map((elem) => chai.expect(() => pt.addFunc([elem])).to.throw(Error));
      });
      it("Is added function in output pt. 1", function() {
         let pt = new ParamTree();
         let f1 = (a) => {};
         pt.addFunc(f1);
         let funcTree = pt.funcTree;
         chai.expect(funcTree[1]["a"][0]).to.equal(f1);
      });
      it("Is added function in output pt. 2", function() {
         let pt = new ParamTree();
         let f1 = (a,b,c) => {};
         let f2 = (a,b,d) => {};
         pt.addFunc(f1);
         pt.addFunc(f2);
         let funcTree = pt.funcTree;
         chai.expect(funcTree[3]["a"]["b"]["c"][0]).to.equal(f1);
         chai.expect(funcTree[3]["a"]["b"]["d"][0]).to.equal(f2);
      });
      it("Is added function in output pt. 3", function() {
         let pt = new ParamTree(true);
         let f1 = (a1,b1,c1) => {};
         let f2 = (a1,b1,d1) => {};
         pt.addFunc(f1);
         pt.addFunc(f2);
         let funcTree = pt.funcTree;
         chai.expect(funcTree["a"]["b"]["c"][0]).to.equal(f1);
         chai.expect(funcTree["a"]["b"]["d"][0]).to.equal(f2);
      });
      it("Is added function in output pt. 3", function() {
         let pt = new ParamTree(false);
         let f1 = (a1,b1,c1) => {};
         let f2 = (a1,b1,d1) => {};
         pt.addFunc(f1);
         pt.addFunc(f2);
         let funcTree = pt.funcTree;
         chai.expect(funcTree[3]["a"]["b"]["c"][0]).to.equal(f1);
         chai.expect(funcTree[3]["a"]["b"]["d"][0]).to.equal(f2);
      });
      it("Is added function in output pt. 4", function() {
         let pt = new ParamTree(false,/\*/g);
         let f1 = (a1,b1,c1) => {};
         let f2 = (a1,b1,d1) => {};
         pt.addFunc(f1);
         pt.addFunc(f2);
         let funcTree = pt.funcTree;
         chai.expect(funcTree[3]["a1"]["b1"]["c1"][0]).to.equal(f1);
         chai.expect(funcTree[3]["a1"]["b1"]["d1"][0]).to.equal(f2);
      });
      it("Is added function in output pt. 5", function() {
         let pt = new ParamTree(true,/\*/g);
         let f1 = (a1,b1,c1) => {};
         let f2 = (a1,b1,d1) => {};
         pt.addFunc(f1);
         pt.addFunc(f2);
         let funcTree = pt.funcTree;
         chai.expect(funcTree["a1"]["b1"]["c1"][0]).to.equal(f1);
         chai.expect(funcTree["a1"]["b1"]["d1"][0]).to.equal(f2);
      });
      it("Check array of functions is added correctly pt. 1", function() {
         let pt = new ParamTree();
         let f1 = (a) => {};
         let f2 = (a) => {};
         let f3 = (a) => {};
         pt.addFunc(f1);
         pt.addFunc(f2);
         pt.addFunc(f3);
         chai.expect(pt.funcTree[1]["a"].length).to.equal(3);
      });
      it("Check array of functions is added correctly pt. 2", function() {
         let pt = new ParamTree();
         let f1 = (a) => {};
         let f2 = (a) => {};
         let f3 = (a,b) => {};
         let f4 = (a,b) => {};
         pt.addFunc(f1);
         pt.addFunc(f2);
         pt.addFunc(f3);
         pt.addFunc(f4);
         chai.expect(pt.funcTree[1]["a"].length).to.equal(2);
         chai.expect(pt.funcTree[2]["a"]["b"].length).to.equal(2);
      });
   });
   describe("funcTree", function() {
      it("Should return an object from funcTree", function() {
         let pt = new ParamTree();
         chai.expect(is.object(pt.funcTree)).to.be.true;
      });
   });
});
