"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _TypeService = _interopRequireDefault(require("./TypeService"));

var _db = _interopRequireDefault(require("./db.connection"));

var _Price = _interopRequireDefault(require("./Price"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Service extends _sequelize.Model {}

Service.init({
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },
  code: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  price_id: {
    type: _sequelize.DataTypes.INTEGER,
    references: {
      model: _Price.default,
      key: 'id'
    }
  },
  description: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  available: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false
  },
  typeService_id: {
    type: _sequelize.DataTypes.INTEGER,
    references: {
      model: _TypeService.default,
      key: 'id'
    }
  },
  default_image: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize: _db.default,
  modelName: "service",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});
var _default = Service;
exports.default = _default;