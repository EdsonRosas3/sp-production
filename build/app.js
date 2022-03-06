"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _libs = require("./libs");

var _path = _interopRequireDefault(require("path"));

var _dotenv = require("dotenv");

var _routes = _interopRequireDefault(require("./routes"));

var _models = _interopRequireDefault(require("./models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _dotenv.config)();

_asyncToGenerator(function* () {
  yield _models.default.sequelize.sync({
    force: false
  });
  yield _libs.initialSetup.createUsers();
  yield _libs.initialSetup.createCategories();
  yield _libs.initialSetup.createTypeServices();
})();

var app = (0, _express.default)(); //view aplication;

app.use(_express.default.static(_path.default.join(__dirname, "/public"))); // Settings

app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4); // Middlewares

var corsOptions = {// origin: "http://localhost:3000",
};
app.use((0, _morgan.default)("dev"));
app.use(_express.default.json());
app.use((0, _cors.default)(corsOptions));
/* 
app.use(helmet());

 */
//app.use(express.urlencoded({ extended: false }));
// Route

app.use("/api", _routes.default);
var _default = app;
exports.default = _default;