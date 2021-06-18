"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.last-index-of");

var splitByLastDot = function splitByLastDot(str) {
  var index = str.lastIndexOf('.');
  return [str.slice(0, index), str.slice(index + 1)];
};

var _default = splitByLastDot;
exports.default = _default;
module.exports = exports.default;