"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var _default = {
  PORT: process.env.PORT || 4000,
  DB_NAME: process.env.DB_NAME //||'smartplants_db'
  ,
  DB_HOST: process.env.DB_HOST //|| "localhost"
  ,
  DB_USER: process.env.DB_USER //|| "root"
  ,
  DB_PASSWORD: process.env.DB_PASSWORD //|| ""
  ,
  DB_NAME: process.env.DB_NAME //|| "testdb"
  ,
  DB_DIALECT: process.env.DB_DIALECT //|| "mysql"
  ,
  SECRET: process.env.SECRET //|| "devstore"

};
exports.default = _default;