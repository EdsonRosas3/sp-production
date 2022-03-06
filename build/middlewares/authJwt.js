"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdmin = exports.verifyToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var verifyToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    var token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({
      message: "No token provided"
    });

    try {
      var decoded = _jsonwebtoken.default.verify(token, _config.default.SECRET);

      var user = yield _User.default.findByPk(decoded.id);
      if (!user) return res.status(404).json({
        message: "Usuario no encontrado"
      });
      req.userId = decoded.id;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "No autorizado"
      });
    }
  });

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;

var isAdmin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    try {
      var user = yield _User.default.findByPk(req.userId, {
        include: [{
          model: _Role.default,
          as: "roles",
          attributes: ["id", "name"],
          through: {
            attributes: []
          }
        }],
        attributes: ["id", "name", "last_name", "username", "email"]
      });
      var roles = [];
      roles = user.roles;
      var _isAdmin = false;
      roles.forEach(role => {
        if (role.name === "admin") {
          _isAdmin = true;
        }
      });

      if (!_isAdmin) {
        return res.status(200).json({
          message: "No es administrador"
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: error
      });
    }

    next();
  });

  return function isAdmin(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.isAdmin = isAdmin;