"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _controllers = require("../controllers");

var _middlewares = require("../middlewares");

var router = (0, _express.Router)();
router.post("/", [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _controllers.userCtrl.createUser);
router.get("/", [_middlewares.authJwt.verifyToken], _controllers.userCtrl.getUsers);
var _default = router;
exports.default = _default;