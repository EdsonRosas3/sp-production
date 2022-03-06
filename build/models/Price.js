"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("./db.connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Price extends _sequelize.Model {}

Price.init({
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  unitPrice: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  totalPrice: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  visible: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  sequelize: _db.default,
  modelName: "price",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});
var _default = Price;
exports.default = _default;