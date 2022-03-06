"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.existCategory = exports.existCodeProduct = exports.existProduct = void 0;

var _Category = _interopRequireDefault(require("../models/Category"));

var _Product = _interopRequireDefault(require("../models/Product"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var existProduct = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      var product = yield _Product.default.findByPk(req.params.productId);

      if (!product) {
        return res.status(404).json({
          message: "Producto no encontrado"
        });
      }

      next();
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function existProduct(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.existProduct = existProduct;

var existCodeProduct = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    try {
      var product = yield _Product.default.findOne({
        where: {
          code: req.params.code
        }
      });

      if (!product) {
        return res.status(404).json({
          message: "Codigo de producto no encontrado"
        });
      }

      next();
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function existCodeProduct(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.existCodeProduct = existCodeProduct;

var existCategory = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res, next) {
    try {
      var category = yield _Category.default.findByPk(req.params.categoryId);

      if (!category) {
        return res.status(404).json({
          message: "Categoria no encontrada"
        });
      }

      next();
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function existCategory(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.existCategory = existCategory;