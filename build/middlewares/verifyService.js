"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.existTypeService = exports.existCodeService = exports.existService = void 0;

var _TypeService = _interopRequireDefault(require("../models/TypeService"));

var _Service = _interopRequireDefault(require("../models/Service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var existService = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      var service = yield _Service.default.findByPk(req.params.serviceId);

      if (!service) {
        return res.status(404).json({
          message: "Servicio no encontrado"
        });
      }

      next();
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function existService(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.existService = existService;

var existCodeService = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    try {
      var service = yield _Service.default.findOne({
        where: {
          code: req.params.code
        }
      });

      if (!service) {
        return res.status(404).json({
          message: "Codigo de servicio no encontrado"
        });
      }

      next();
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function existCodeService(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.existCodeService = existCodeService;

var existTypeService = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res, next) {
    try {
      var type = yield _TypeService.default.findByPk(req.params.typeServiceId);

      if (!type) {
        return res.status(404).json({
          message: "Tipo de servicio no encontrado"
        });
      }

      next();
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function existTypeService(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.existTypeService = existTypeService;