"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDefaultImage = exports.getServiceByTypeId = exports.getServiceByTypeIdNoA = exports.getServiceByTypeIdA = exports.deleteServiceById = exports.updateServiceById = exports.getServices = exports.getServiceByCode = exports.getServiceById = exports.createService = void 0;

var _Service = _interopRequireDefault(require("../models/Service"));

var _ImageService = _interopRequireDefault(require("../models/ImageService"));

var _imgConfiguration = require("../imgConfiguration");

var _Price = _interopRequireDefault(require("../models/Price"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createService = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var price = yield _Price.default.create(req.body.price);
      req.body.price_id = price.id;
      var services = yield _Service.default.findAndCountAll();
      req.body.code = generateCode(services);
      var service = yield _Service.default.create(req.body);
      return res.status(201).json({
        message: "Producto ha sido actualizado",
        service
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function createService(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createService = createService;

var getServiceById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var service = yield _Service.default.findByPk(req.params.serviceId);
      var price = yield _Price.default.findByPk(service.price_id);
      service.price_id = price;
      return res.status(200).json(service);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function getServiceById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //buscar servicio por code


exports.getServiceById = getServiceById;

var getServiceByCode = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var service = yield _Service.default.findOne({
        where: {
          code: req.params.code
        }
      });
      var price = yield _Price.default.findByPk(service.price_id);
      service.price_id = price;
      return res.status(200).json(service);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function getServiceByCode(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); //todos los servicios


exports.getServiceByCode = getServiceByCode;

var getServices = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      var pageAsNumber = Number.parseInt(req.query.page);
      var sizeAsNumber = Number.parseInt(req.query.size);
      var order_by = req.query.order_by;
      var order_direction = req.query.order_direction;
      var page = 0;

      if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
      }

      var size = 30;

      if (!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 30) && !(sizeAsNumber < 1)) {
        size = sizeAsNumber;
      }

      var allServices = yield _Service.default.findAndCountAll({
        limit: size,
        offset: page * size,
        order: [[order_by, order_direction]]
      });
      var i = 0;

      while (i < allServices.count) {
        var service = allServices.rows[i];
        var price = yield _Price.default.findByPk(service.price_id);
        service.price_id = price;
        i++;
      }

      return res.send({
        content: allServices.rows,
        totalPages: Math.ceil(allServices.count / Number.parseInt(size)),
        totalServices: allServices.count
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function getServices(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getServices = getServices;

var updateServiceById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var updateService = yield _Service.default.update(req.body, {
        where: {
          id: req.params.serviceId
        }
      });
      var service = yield _Service.default.findByPk(req.params.serviceId);
      var updatedPrice = yield _Price.default.update(req.body.price, {
        where: {
          id: service.price_id
        }
      });
      var price = yield _Price.default.findByPk(service.price_id);
      service.price_id = price;
      return res.status(201).json({
        message: "Servicio ha sido actualizado"
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function updateServiceById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateServiceById = updateServiceById;

var deleteServiceById = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      var publicnames = yield _ImageService.default.findAll({
        where: {
          service_id: req.params.serviceId
        },
        attributes: ['public_name']
      });
      var service = yield _Service.default.findByPk(req.params.serviceId);
      var deleteService = yield _Service.default.destroy({
        where: {
          id: req.params.serviceId
        }
      });
      var deletePrice = yield _Price.default.destroy({
        where: {
          id: service.price_id
        }
      });
      publicnames.forEach(image => {
        (0, _imgConfiguration.deleteImage)("images/".concat(image.public_name));
        (0, _imgConfiguration.deleteImage)("images/optimizeimg/300/".concat(image.public_name));
        (0, _imgConfiguration.deleteImage)("images/optimizeimg/700/".concat(image.public_name));
      });
      return res.status(200).json({
        message: "Servicio ha sido eliminado",
        deleteService
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function deleteServiceById(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}(); //servicios disponibles por tipo de servicio


exports.deleteServiceById = deleteServiceById;

var getServiceByTypeIdA = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    try {
      var pageAsNumber = Number.parseInt(req.query.page);
      var sizeAsNumber = Number.parseInt(req.query.size);
      var order_by = req.query.order_by;
      var order_direction = req.query.order_direction;
      var page = 0;

      if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
      }

      var size = 30;

      if (!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 30) && !(sizeAsNumber < 1)) {
        size = sizeAsNumber;
      }

      var serviceByType = yield _Service.default.findAndCountAll({
        where: {
          typeService_id: req.params.typeServiceId,
          available: true
        },
        limit: size,
        offset: page * size,
        order: [[order_by, order_direction]]
      });
      var i = 0;

      while (i < serviceByType.rows.length) {
        var service = serviceByType.rows[i];
        var price = yield _Price.default.findByPk(service.price_id);
        service.price_id = price;
        i++;
      }

      return res.send({
        content: serviceByType.rows,
        totalPages: Math.ceil(serviceByType.count / Number.parseInt(size)),
        totalServices: serviceByType.count
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function getServiceByTypeIdA(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}(); //servicios no disponibles por tipo de servicio


exports.getServiceByTypeIdA = getServiceByTypeIdA;

var getServiceByTypeIdNoA = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res) {
    try {
      var pageAsNumber = Number.parseInt(req.query.page);
      var sizeAsNumber = Number.parseInt(req.query.size);
      var order_by = req.query.order_by;
      var order_direction = req.query.order_direction;
      var page = 0;

      if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
      }

      var size = 30;

      if (!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 30) && !(sizeAsNumber < 1)) {
        size = sizeAsNumber;
      }

      var serviceByType = yield _Service.default.findAndCountAll({
        where: {
          typeService_id: req.params.typeServiceId,
          available: false
        },
        limit: size,
        offset: page * size,
        order: [[order_by, order_direction]]
      });
      var i = 0;

      while (i < serviceByType.rows.length) {
        var service = serviceByType.rows[i];
        var price = yield _Price.default.findByPk(service.price_id);
        service.price_id = price;
        i++;
      }

      ;
      return res.send({
        content: serviceByType.rows,
        totalPages: Math.ceil(serviceByType.count / Number.parseInt(size)),
        totalServices: serviceByType.count
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function getServiceByTypeIdNoA(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}(); //todos los servicios por tipo de servicio


exports.getServiceByTypeIdNoA = getServiceByTypeIdNoA;

var getServiceByTypeId = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (req, res) {
    try {
      var pageAsNumber = Number.parseInt(req.query.page);
      var sizeAsNumber = Number.parseInt(req.query.size);
      var order_by = req.query.order_by;
      var order_direction = req.query.order_direction;
      var page = 0;

      if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
      }

      var size = 30;

      if (!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 30) && !(sizeAsNumber < 1)) {
        size = sizeAsNumber;
      }

      var serviceByType = yield _Service.default.findAndCountAll({
        where: {
          typeService_id: req.params.typeServiceId
        },
        limit: size,
        offset: page * size,
        order: [[order_by, order_direction]]
      });
      var i = 0;

      while (i < serviceByType.rows.length) {
        var service = serviceByType.rows[i];
        var price = yield _Price.default.findByPk(service.price_id);
        service.price_id = price;
        i++;
      }

      return res.send({
        content: serviceByType.rows,
        totalPages: Math.ceil(serviceByType.count / Number.parseInt(size)),
        totalServices: serviceByType.count
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function getServiceByTypeId(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.getServiceByTypeId = getServiceByTypeId;

var updateDefaultImage = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(function* (req, res) {
    try {
      var updateService = yield _Service.default.update(req.body, {
        where: {
          id: req.params.serviceId
        }
      });
      return res.status(201).json({
        message: "La imagen principal se actualizo",
        updateService
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function updateDefaultImage(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

exports.updateDefaultImage = updateDefaultImage;

function generateCode(elements) {
  var length = elements.count;
  var number = elements.count;

  if (length < 9) {
    number = "000" + (length + 1);
  }

  if (length > 9 && length < 99) {
    number = "00" + (length + 1);
  }

  if (length > 99 && length < 999) {
    number = "0" + (length + 1);
  }

  if (length > 9999) {
    var r = Math.random() * (10000 - 1) + 1;
    number = Math.floor(r);
  }

  var codeRandom = generateRandom(4) + number;
  return codeRandom;
}

function generateRandom(num) {
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(''),
      result = "";
  if (num > characters.length) return false;

  for (var i = 0; i < num; i++) {
    result += characters.splice(Math.floor(Math.random() * characters.length), 1)[0];
  }

  return result;
}