"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.replace");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("core-js/modules/es6.array.is-array");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

var _object = _interopRequireDefault(require("object.entries"));

var _util = require("util");

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _splitByLastDot = _interopRequireDefault(require("./helpers/splitByLastDot"));

var _isConstrutor = _interopRequireDefault(require("./helpers/isConstrutor"));

var cwd = process.cwd();

var mapRoutes = function mapRoutes(routes, pathToController) {
  var middlewareGenerals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var router = _express.default.Router();

  var requestMethodPath;
  var requestMethod;
  var controllerMethod;
  var controller;
  var contr;
  var handler;
  var myPath;

  var myPathToController = _path.default.join(cwd, pathToController);

  var routesArr = (0, _object.default)(routes);
  routesArr.forEach(function (value) {
    var middlewares; // to let use an array or only one function as general middlewares

    if (Array.isArray(middlewareGenerals)) {
      middlewares = (0, _toConsumableArray2.default)(middlewareGenerals);
    } else if (typeof middlewareGenerals === 'function') {
      middlewares = [middlewareGenerals];
    } else {
      middlewares = [];
    }

    requestMethodPath = value[0].replace(/\s\s+/g, ' ');
    requestMethod = requestMethodPath.split(' ')[0].toLocaleLowerCase();
    myPath = requestMethodPath.split(' ')[1];

    if ((0, _util.isString)(value[1])) {
      controller = (0, _splitByLastDot.default)(value[1])[0];
      controllerMethod = (0, _splitByLastDot.default)(value[1])[1];
    } else {
      // contains middlewares and other configuration
      var props = value[1]; // Extract controller paths

      if (props.path !== undefined) {
        controller = (0, _splitByLastDot.default)(props.path)[0];
        controllerMethod = (0, _splitByLastDot.default)(props.path)[1];
      } // Extract middlewares.


      if (props.middlewares !== undefined && Array.isArray(props.middlewares)) {
        var _middlewares;

        (_middlewares = middlewares).push.apply(_middlewares, (0, _toConsumableArray2.default)(props.middlewares));
      }
    }

    middlewares = middlewares.filter(function (el) {
      return el != null;
    });

    try {
      handler = require("".concat(myPathToController).concat(controller));
      var isConstructable = (0, _isConstrutor.default)(handler);

      if (isConstructable) {
        contr = new handler();
      } else {
        contr = handler();
      }
    } catch (err) {
      require('@babel/register');

      handler = require("".concat(myPathToController).concat(controller)).default;
      contr = new handler();
    }

    router.route(myPath)[requestMethod](middlewares, contr[controllerMethod]);
  });
  return router;
};

var _default = mapRoutes;
exports.default = _default;
module.exports = exports.default;