"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var isConstructor = function isConstructor(func) {
  try {
    new func();
  } catch (err) {
    return false;
  }

  return true;
};

var _default = isConstructor;
exports.default = _default;
module.exports = exports.default;