import { Router } from "express";
import { serviceCtrl, imageServiceCtrl } from "../controllers";
import { authJwt, verifyService } from "../middlewares";
import { upload } from "../imgConfiguration";

const router = Router();

router.get(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  serviceCtrl.getServices
);

router.get(
  "/:serviceId",
  [authJwt.verifyToken, authJwt.isAdmin, verifyService.existService],
  serviceCtrl.getServiceById
);

//busca servicio por code
router.get(
  "/c/:code",
    serviceCtrl.getServiceByCode
);

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  serviceCtrl.createService
);

router.put(
  "/:serviceId",
  [authJwt.verifyToken, authJwt.isAdmin, verifyService.existService],
  serviceCtrl.updateServiceById
);

router.delete(
  "/:serviceId",
  [authJwt.verifyToken, authJwt.isAdmin, verifyService.existService],
  serviceCtrl.deleteServiceById
);

//servicios disponibles por tipo de servicio
router.get(
  "/type/a/:typeServiceId",
  serviceCtrl.getServiceByTypeIdA
);

//servicios no disponibles por tipo de servicio
router.get(
  "/type/na/:typeServiceId", 
  [authJwt.verifyToken,authJwt.isAdmin,verifyService.existTypeService],
  serviceCtrl.getServiceByTypeIdNoA
);

//todos los servicios por tipo de servicio
router.get(
  "/type/:typeServiceId",
  [authJwt.verifyToken, authJwt.isAdmin, verifyService.existTypeService],
  serviceCtrl.getServiceByTypeId
);

router.patch(
  "/defaul/image/:serviceId",
  serviceCtrl.updateDefaultImage
);

//Router images

router.post(
  "/images/upload/:idService",
  [ authJwt.verifyToken, upload.array("files", 12)],
  imageServiceCtrl.uploadImgs
);
router.get("/images/names/:serviceId", imageServiceCtrl.showNameImgs);
router.get("/images/:size/:filename", imageServiceCtrl.sendFile);
router.delete("/images/:publicname",imageServiceCtrl.destroyImage);
export default router;
