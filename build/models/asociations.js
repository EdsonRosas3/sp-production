"use strict";

var _Role = _interopRequireDefault(require("./Role"));

var _User = _interopRequireDefault(require("./User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Role.default.belongsToMany(_User.default, {
  through: "user_role"
});

_User.default.belongsToMany(_Role.default, {
  through: "user_role"
});