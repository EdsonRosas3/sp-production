"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("./db.connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class User extends _sequelize.Model {}

User.init({
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: _sequelize.DataTypes.STRING
  },
  last_name: {
    type: _sequelize.DataTypes.STRING
  },
  username: {
    type: _sequelize.DataTypes.STRING
  },
  email: {
    type: _sequelize.DataTypes.STRING
  },
  password: {
    type: _sequelize.DataTypes.STRING
  }
}, {
  sequelize: _db.default,
  modelName: "user",
  timestamps: false
});
var _default = User;
exports.default = _default;