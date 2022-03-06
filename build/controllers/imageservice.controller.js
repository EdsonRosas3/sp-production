"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyImage = exports.showImagesByIdService = exports.showNameImgs = exports.sendFile = exports.uploadImgs = void 0;

var _Service = _interopRequireDefault(require("../models/Service"));

var _ImageService = _interopRequireDefault(require("../models/ImageService"));

var _imgConfiguration = require("../imgConfiguration");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var uploadImgs = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      req.files.forEach( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(function* (file) {
          (0, _imgConfiguration.helperImg)(file.path, file.filename, "300");
          (0, _imgConfiguration.helperImg)(file.path, file.filename, "700", 700);
          yield _ImageService.default.create({
            original_name: file.originalname,
            public_name: file.filename,
            type: file.mimetype,
            size: file.size,
            service_id: req.params.idService
          });
        });

        return function (_x3) {
          return _ref2.apply(this, arguments);
        };
      }());
      var service = yield _Service.default.findByPk(req.params.idService);

      if (!service.default_image) {
        yield _Service.default.update({
          default_image: req.files[0].filename
        }, {
          where: {
            id: req.params.idService
          }
        });
      }

      res.json({
        UPLOAD: true,
        message: "Imagenes guardado"
      });
    } catch (error) {
      res.json({
        UPLOAD: false,
        message: "Error en la carga"
      });
    }
  });

  return function uploadImgs(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.uploadImgs = uploadImgs;

var sendFile = (req, res) => {
  try {
    var dir = _path.default.join(__dirname, "../storage/optimizeimg/".concat(req.params.size, "/").concat(req.params.filename));

    res.sendFile(dir);
  } catch (error) {}
};

exports.sendFile = sendFile;

var showNameImgs = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var publicnames = yield _ImageService.default.findAll({
        where: {
          service_id: req.params.serviceId
        },
        attributes: ['public_name', 'original_name']
      });
      return res.status(200).json(publicnames);
    } catch (error) {}
  });

  return function showNameImgs(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.showNameImgs = showNameImgs;

var showImagesByIdService = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      var images = yield _ImageService.default.findAll({
        where: {
          service_id: req.params.serviceId
        }
      });
      return res.status(200).json(images);
    } catch (error) {}
  });

  return function showImagesByIdService(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

exports.showImagesByIdService = showImagesByIdService;

var destroyImage = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var nameImage = req.params.publicname;
      yield _ImageService.default.destroy({
        where: {
          public_name: req.params.publicname
        }
      });
      (0, _imgConfiguration.deleteImage)("images/".concat(nameImage));
      (0, _imgConfiguration.deleteImage)("optimizeimg/300/".concat(nameImage));
      (0, _imgConfiguration.deleteImage)("optimizeimg/700/".concat(nameImage));
      return res.status(200).json({
        DELETE: true,
        message: "Las imagenes se eliminaron correctamente."
      });
    } catch (error) {}
  });

  return function destroyImage(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

exports.destroyImage = destroyImage;