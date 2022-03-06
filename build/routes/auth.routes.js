"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _controllers = require("../controllers");

var _middlewares = require("../middlewares");

var router = (0, _express.Router)();
router.post("/signup", [_middlewares.verifySignup.checkDuplicateUsernameOrEmail], _controllers.authCtrl.signUp);
router.post("/signin", _controllers.authCtrl.signin);
var _default = router;
exports.default = _default;