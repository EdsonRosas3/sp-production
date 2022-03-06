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
router.get("/", [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _controllers.serviceCtrl.getServices);
router.get("/:serviceId", [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyService.existService], _controllers.serviceCtrl.getServiceById); //busca servicio por code

router.get("/c/:code", _controllers.serviceCtrl.getServiceByCode);
router.post("/", [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _controllers.serviceCtrl.createService);
router.put("/:serviceId", [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyService.existService], _controllers.serviceCtrl.updateServiceById);
router.delete("/:serviceId", [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyService.existService], _controllers.serviceCtrl.deleteServiceById); //servicios disponibles por tipo de servicio

router.get("/type/a/:typeServiceId", _controllers.serviceCtrl.getServiceByTypeIdA); //servicios no disponibles por tipo de servicio

router.get("/type/na/:typeServiceId", [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyService.existTypeService], _controllers.serviceCtrl.getServiceByTypeIdNoA); //todos los servicios por tipo de servicio

router.get("/type/:typeServiceId", [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyService.existTypeService], _controllers.serviceCtrl.getServiceByTypeId);
router.patch("/defaul/image/:serviceId", _controllers.serviceCtrl.updateDefaultImage); //Router images

router.post("/images/upload/:idService", [_middlewares.authJwt.verifyToken, _imgConfiguration.upload.array("files", 12)], _controllers.imageServiceCtrl.uploadImgs);
router.get("/images/names/:serviceId", _controllers.imageServiceCtrl.showNameImgs);
router.get("/images/:size/:filename", _controllers.imageServiceCtrl.sendFile);
router.delete("/images/:publicname", _controllers.imageServiceCtrl.destroyImage);
var _default = router;
exports.default = _default;