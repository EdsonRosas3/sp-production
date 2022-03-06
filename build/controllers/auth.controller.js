"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signin = exports.signUp = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signUp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var {
        name,
        last_name,
        username,
        email,
        password
      } = req.body;
      var newUser = yield _User.default.create({
        name,
        last_name,
        username,
        email,
        password: yield (0, _utils.encryptPassword)(password)
      });

      var token = _jsonwebtoken.default.sign({
        id: newUser.id
      }, _config.default.SECRET, {
        expiresIn: 86400 //24 horas

      });

      return res.json({
        token
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function signUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signUp = signUp;

var signin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var {
      username,
      email,
      password
    } = req.body;
    var include = {
      include: [{
        model: _Role.default,
        as: "roles",
        attributes: ["id", "name"],
        through: {
          attributes: []
        }
      }],
      attributes: ["id", "name", "last_name", "username", "email"]
    };

    try {
      var userFound;

      if (email) {
        userFound = yield _User.default.findOne({
          where: {
            email: email
          }
        });
      }

      if (username) {
        userFound = yield _User.default.findOne({
          where: {
            username: username
          }
        });
      }

      if (!userFound) return res.status(200).json({
        token: null,
        message: "Nombre de usuario o contraseña incorrecta"
      });
      var matchPassword = yield (0, _utils.comparePassword)(password, userFound.password);
      if (!matchPassword) return res.status(200).json({
        token: null,
        message: "Nombre de usuario o contraseña incorrecta"
      });
      var user = yield _User.default.findByPk(userFound.id, include);

      var token = _jsonwebtoken.default.sign({
        id: userFound.id
      }, _config.default.SECRET, {
        expiresIn: 86400 // 24 hours

      });

      res.status(200).json({
        token,
        user
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function signin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signin = signin;