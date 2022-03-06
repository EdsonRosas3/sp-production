"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTypeServices = exports.createCategories = exports.createUsers = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _models = _interopRequireDefault(require("../models"));

var _Category = _interopRequireDefault(require("../models/Category"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _TypeService = _interopRequireDefault(require("../models/TypeService"));

var _User = _interopRequireDefault(require("../models/User"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    var lenth = yield _Role.default.count();

    if (lenth < 2) {
      var userAdmin = yield _Role.default.create({
        name: "admin",
        users: [{
          name: "admin",
          last_name: "admin",
          username: "admin",
          email: "admin@admin.com",
          password: yield (0, _utils.encryptPassword)("admin")
        }]
      }, {
        include: "users"
      });
      var user = yield _Role.default.create({
        name: "user",
        users: [{
          name: "user",
          last_name: "user",
          username: "user",
          email: "user@user.com",
          password: yield (0, _utils.encryptPassword)("user")
        }]
      }, {
        include: "users"
      });
    }
  });

  return function createUsers() {
    return _ref.apply(this, arguments);
  };
}();

exports.createUsers = createUsers;

var createCategories = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* () {
    var lenth = yield _Category.default.count();

    if (lenth < 4) {
      var maquinaria = yield _Category.default.create({
        name: "Maquinaria"
      });
      var invernaderos = yield _Category.default.create({
        name: "Invernaderos"
      });
      var riegos = yield _Category.default.create({
        name: "Riegos"
      });
      var laboratorios = yield _Category.default.create({
        name: "Laboratorios"
      });
    }
  });

  return function createCategories() {
    return _ref2.apply(this, arguments);
  };
}();

exports.createCategories = createCategories;

var createTypeServices = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* () {
    var lenth = yield _TypeService.default.count();

    if (lenth < 5) {
      var construccion = yield _TypeService.default.create({
        name: "Diseño y construcción de invernaderos"
      });
      var instalacion = yield _TypeService.default.create({
        name: "Diseño e instalación de sistemas de riego"
      });
      var capacitacion = yield _TypeService.default.create({
        name: "Cursos de capacitación"
      });
      var asesoria = yield _TypeService.default.create({
        name: "Asesoría técnica en la producción"
      });
      var laboratorio = yield _TypeService.default.create({
        name: "Laboratorio agrícola"
      });
    }
  });

  return function createTypeServices() {
    return _ref3.apply(this, arguments);
  };
}();

exports.createTypeServices = createTypeServices;