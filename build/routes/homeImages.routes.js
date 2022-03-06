"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _controllers = require("../controllers");

var _imgConfiguration = require("../imgConfiguration");

var router = (0, _express.Router)();
router.get("/images/lg/:filename", _controllers.homeImagesCtrl.sendFileLg);
router.get("/images/md/:filename", _controllers.homeImagesCtrl.sendFileMd);
router.get("/images/sm/:filename", _controllers.homeImagesCtrl.sendFileSm);
router.get("/images/login", _controllers.homeImagesCtrl.sendImgeLogin);
var _default = router;
exports.default = _default;