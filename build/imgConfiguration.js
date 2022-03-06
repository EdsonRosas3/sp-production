"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteImage = exports.upload = exports.helperImg = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _sharp = _interopRequireDefault(require("sharp"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//images
var storage = _multer.default.diskStorage({
  destination: (req, file, cb) => {
    cb(null, _path.default.join(__dirname, '/storage/images'));
  },
  filename: (req, file, cb) => {
    var ext = _path.default.extname(file.originalname);

    var fileName = "".concat(Date.now()).concat(ext);
    cb(null, fileName);
  }
});

var helperImg = function helperImg(filePath, fileName, direcotoryDestination) {
  var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 300;
  return (0, _sharp.default)(filePath).resize(size).toFile(_path.default.join(__dirname, "/storage/optimizeimg/".concat(direcotoryDestination, "/").concat(fileName)));
}; //middleware


exports.helperImg = helperImg;
var upload = (0, _multer.default)({
  storage
});
exports.upload = upload;

var deleteImage = direccion => {
  try {
    _fs.default.unlinkSync(_path.default.join(__dirname, "/storage/".concat(direccion)));
  } catch (error) {
    console.log(error);
  }
};

exports.deleteImage = deleteImage;