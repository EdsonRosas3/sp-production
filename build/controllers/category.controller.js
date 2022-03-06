"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allCategory = void 0;

var _Category = _interopRequireDefault(require("../models/Category"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var allCategory = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var categories = yield _Category.default.findAll();
      return res.status(200).json(categories);
    } catch (error) {}
  });

  return function allCategory(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.allCategory = allCategory;