"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyService = exports.verifyProduct = exports.verifySignup = exports.authJwt = void 0;

var authJwt = _interopRequireWildcard(require("./authJwt"));

exports.authJwt = authJwt;

var verifySignup = _interopRequireWildcard(require("./verifySignup"));

exports.verifySignup = verifySignup;

var verifyProduct = _interopRequireWildcard(require("./verifyProduct"));

exports.verifyProduct = verifyProduct;

var verifyService = _interopRequireWildcard(require("./verifyService"));

exports.verifyService = verifyService;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }