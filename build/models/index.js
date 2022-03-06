"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

require("./asociations.js");

var _dbConnection = _interopRequireDefault(require("./db.connection.js"));

var _User = _interopRequireDefault(require("./User"));

var _Product = _interopRequireDefault(require("./Product"));

var _Role = _interopRequireDefault(require("./Role"));

var _Category = _interopRequireDefault(require("./Category"));

var _Image = _interopRequireDefault(require("./Image"));

var _TypeService = _interopRequireDefault(require("./TypeService"));

var _Service = _interopRequireDefault(require("./Service"));

var _ImageService = _interopRequireDefault(require("./ImageService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = _dbConnection.default;
var db = {};
db.Sequelize = _sequelize.default;
db.sequelize = sequelize;
db.Category = _Category.default;
db.Product = _Product.default;
db.User = _User.default;
db.Role = _Role.default;
db.Image = _Image.default;
db.TypeService = _TypeService.default;
db.Service = _Service.default;
db.ImageService = _ImageService.default;
var _default = db;
exports.default = _default;