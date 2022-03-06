"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendImgeLogin = exports.sendFileSm = exports.sendFileMd = exports.sendFileLg = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendFileLg = (req, res) => {
  try {
    var dir = _path.default.join(__dirname, "../storage/home/1500X700/".concat(req.params.filename));

    res.sendFile(dir);
  } catch (error) {}
};

exports.sendFileLg = sendFileLg;

var sendFileMd = (req, res) => {
  try {
    var dir = _path.default.join(__dirname, "../storage/home/940X600/".concat(req.params.filename));

    res.sendFile(dir);
  } catch (error) {}
};

exports.sendFileMd = sendFileMd;

var sendFileSm = (req, res) => {
  try {
    var dir = _path.default.join(__dirname, "../storage/home/400X600/".concat(req.params.filename));

    res.sendFile(dir);
  } catch (error) {}
};

exports.sendFileSm = sendFileSm;

var sendImgeLogin = (req, res) => {
  try {
    var dir = _path.default.join(__dirname, "../storage/home/login/login.jpg");

    res.sendFile(dir);
  } catch (error) {}
};

exports.sendImgeLogin = sendImgeLogin;