"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("./auth.routes"));

var _products = _interopRequireDefault(require("./products.routes"));

var _user = _interopRequireDefault(require("./user.routes"));

var _category = _interopRequireDefault(require("./category.routes"));

var _service = _interopRequireDefault(require("./service.routes"));

var _typeservice = _interopRequireDefault(require("./typeservice.routes"));

var _homeImages = _interopRequireDefault(require("./homeImages.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.use("/auth", _auth.default);
router.use("/products", _products.default);
router.use("/users", _user.default);
router.use("/categories", _category.default);
router.use("/services", _service.default);
router.use("/typeservices", _typeservice.default);
router.use("/media", _homeImages.default);
var _default = router;
exports.default = _default;