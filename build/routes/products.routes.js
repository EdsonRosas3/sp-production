"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _controllers = require("../controllers");

var _middlewares = require("../middlewares");

var _imgConfiguration = require("../imgConfiguration");

var router = (0, _express.Router)();
router.get("/", [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _controllers.productCtrl.getProducts);
router.get("/:productId", [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyProduct.existProduct], _controllers.productCtrl.getProductById); //busca producto por code

router.get("/c/:code", _controllers.productCtrl.getProductByCode);
router.post("/", [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _controllers.productCtrl.createProduct);
router.put("/:productId", [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyProduct.existProduct], _controllers.productCtrl.updateProductById);
router.delete("/:productId", [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyProduct.existProduct], _controllers.productCtrl.deleteProductById); //productos disponibles por categoria

router.get("/category/a/:categoryId", [_middlewares.verifyProduct.existCategory], _controllers.productCtrl.getProductByCategoryIdA); //productos no disponibles por categoria

router.get("/category/na/:categoryId", [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyProduct.existCategory], _controllers.productCtrl.getProductByCategoryIdNoA); //todos los productos por categoria

router.get("/category/:categoryId", [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyProduct.existCategory], _controllers.productCtrl.getProductByCategoryId);
router.patch("/defaul/image/:productId", _controllers.productCtrl.updateDefaultImage); //Router images

router.post("/images/upload/:idProduct", [_middlewares.authJwt.verifyToken, _imgConfiguration.upload.array("files", 12)], _controllers.imageCtrl.uploadImgs);
router.get("/images/names/:productId", _controllers.imageCtrl.showNameImgs);
router.get("/images/:size/:filename", _controllers.imageCtrl.sendFile);
router.delete("/images/:publicname", _controllers.imageCtrl.destroyImage);
var _default = router;
exports.default = _default;