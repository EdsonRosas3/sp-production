"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _Product = _interopRequireDefault(require("./Product"));

var _db = _interopRequireDefault(require("./db.connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Image extends _sequelize.Model {}

Image.init({
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  original_name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  public_name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  type: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  size: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  product_id: {
    type: _sequelize.DataTypes.INTEGER,
    references: {
      model: _Product.default,
      key: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  }
}, {
  sequelize: _db.default,
  modelName: "image",
  timestamps: false
});
var _default = Image;
exports.default = _default;