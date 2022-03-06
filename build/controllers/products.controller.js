"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDefaultImage = exports.getProductByCategoryId = exports.getProductByCategoryIdNoA = exports.getProductByCategoryIdA = exports.deleteProductById = exports.updateProductById = exports.getProducts = exports.getProductByCode = exports.getProductById = exports.createProduct = void 0;

var _Product = _interopRequireDefault(require("../models/Product"));

var _Image = _interopRequireDefault(require("../models/Image"));

var _imgConfiguration = require("../imgConfiguration");

var _Price = _interopRequireDefault(require("../models/Price"));

var _Category = _interopRequireDefault(require("../models/Category"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createProduct = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var price = yield _Price.default.create(req.body.price);
      req.body.price_id = price.id;
      var products = yield _Product.default.findAndCountAll();
      req.body.code = generateCode(products);
      var product = yield _Product.default.create(req.body);
      return res.status(201).json({
        product
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });

  return function createProduct(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createProduct = createProduct;

var getProductById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var product = yield _Product.default.findByPk(req.params.productId);
      var price = yield _Price.default.findByPk(product.price_id);
      product.price_id = price;
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function getProductById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //buscar producto por code


exports.getProductById = getProductById;

var getProductByCode = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var product = yield _Product.default.findOne({
        where: {
          code: req.params.code
        }
      });
      var price = yield _Price.default.findByPk(product.price_id);
      product.price_id = price;
      var category = yield _Category.default.findByPk(product.category_id);
      var navigation = {
        urlpath: ""
      };

      switch (category.name) {
        case "Maquinaria":
          navigation.urlpath = "/all/maquinarias";
          break;

        case "Invernaderos":
          navigation.urlpath = "/all/invernaderos";
          break;

        case "Riegos":
          navigation.urlpath = "/all/riegos";
          break;

        case "Laboratorios":
          navigation.urlpath = "/all/laboratorios";
          break;

        default:
          break;
      }

      product.category_id = navigation;
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function getProductByCode(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); //todos los productos


exports.getProductByCode = getProductByCode;

var getProducts = /*#__PURE__*/function () {
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

      var allProducts = yield _Product.default.findAndCountAll({
        limit: size,
        offset: page * size,
        order: [[order_by, order_direction]]
      });
      var i = 0;

      while (i < allProducts.count) {
        var product = allProducts.rows[i];
        var price = yield _Price.default.findByPk(product.price_id);
        product.price_id = price;
        i++;
      }

      return res.send({
        content: allProducts.rows,
        totalPages: Math.ceil(allProducts.count / Number.parseInt(size)),
        totalProducts: allProducts.count
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function getProducts(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getProducts = getProducts;

var updateProductById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var updateProduct = yield _Product.default.update(req.body, {
        where: {
          id: req.params.productId
        }
      });
      var product = yield _Product.default.findByPk(req.params.productId);
      var updatedPrice = yield _Price.default.update(req.body.price, {
        where: {
          id: product.price_id
        }
      });
      var price = yield _Price.default.findByPk(product.price_id);
      product.price_id = price;
      return res.status(201).json({
        message: "Producto ha sido actualizado",
        product
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function updateProductById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateProductById = updateProductById;

var deleteProductById = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      var publicnames = yield _Image.default.findAll({
        where: {
          product_id: req.params.productId
        },
        attributes: ["public_name"]
      });
      var product = yield _Product.default.findByPk(req.params.productId);
      var deleteProduct = yield _Product.default.destroy({
        where: {
          id: req.params.productId
        }
      });
      var deletePrice = yield _Price.default.destroy({
        where: {
          id: product.price_id
        }
      });
      publicnames.forEach(image => {
        (0, _imgConfiguration.deleteImage)("images/".concat(image.public_name));
        (0, _imgConfiguration.deleteImage)("optimizeimg/300/".concat(image.public_name));
        (0, _imgConfiguration.deleteImage)("optimizeimg/700/".concat(image.public_name));
      });
      return res.status(200).json({
        message: "Producto ha sido eliminado",
        deleteProduct
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function deleteProductById(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}(); //productos disponibles por categoria


exports.deleteProductById = deleteProductById;

var getProductByCategoryIdA = /*#__PURE__*/function () {
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

      var productsByCategory = yield _Product.default.findAndCountAll({
        where: {
          category_id: req.params.categoryId,
          available: true
        },
        limit: size,
        offset: page * size,
        order: [[order_by, order_direction]]
      });
      var i = 0;

      while (i < productsByCategory.rows.length) {
        var product = productsByCategory.rows[i];
        var price = yield _Price.default.findByPk(product.price_id);
        product.price_id = price;
        i++;
      }

      return res.send({
        content: productsByCategory.rows,
        totalPages: Math.ceil(productsByCategory.count / Number.parseInt(size)),
        totalProducts: productsByCategory.count
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function getProductByCategoryIdA(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}(); //productos no disponibles por categoria


exports.getProductByCategoryIdA = getProductByCategoryIdA;

var getProductByCategoryIdNoA = /*#__PURE__*/function () {
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

      var productsByCategory = yield _Product.default.findAndCountAll({
        where: {
          category_id: req.params.categoryId,
          available: false
        },
        limit: size,
        offset: page * size,
        order: [[order_by, order_direction]]
      });
      var i = 0;

      while (i < productsByCategory.rows.length) {
        var product = productsByCategory.rows[i];
        var price = yield _Price.default.findByPk(product.price_id);
        product.price_id = price;
        i++;
      }

      return res.send({
        content: productsByCategory.rows,
        totalPages: Math.ceil(productsByCategory.count / Number.parseInt(size)),
        totalProducts: productsByCategory.count
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });

  return function getProductByCategoryIdNoA(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}(); //todos los productos por categoria


exports.getProductByCategoryIdNoA = getProductByCategoryIdNoA;

var getProductByCategoryId = /*#__PURE__*/function () {
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

      var productsByCategory = yield _Product.default.findAndCountAll({
        where: {
          category_id: req.params.categoryId
        },
        limit: size,
        offset: page * size,
        order: [[order_by, order_direction]]
      });
      var i = 0;

      while (i < productsByCategory.rows.length) {
        var product = productsByCategory.rows[i];
        var price = yield _Price.default.findByPk(product.price_id);
        product.price_id = price;
        i++;
      }

      return res.send({
        content: productsByCategory.rows,
        totalPages: Math.ceil(productsByCategory.count / Number.parseInt(size)),
        totalProducts: productsByCategory.count
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function getProductByCategoryId(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.getProductByCategoryId = getProductByCategoryId;

var updateDefaultImage = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(function* (req, res) {
    try {
      var updateProduct = yield _Product.default.update(req.body, {
        where: {
          id: req.params.productId
        }
      });
      return res.status(201).json({
        message: "La imagen principal se actualizo",
        updateProduct
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
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
      result = "";
  if (num > characters.length) return false;

  for (var i = 0; i < num; i++) {
    result += characters.splice(Math.floor(Math.random() * characters.length), 1)[0];
  }

  return result;
}