import { Router } from "express";
import { productCtrl, imageCtrl } from "../controllers";
import { authJwt, verifyProduct } from "../middlewares";
import { upload } from "../imgConfiguration";

const router = Router();

router.get(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  productCtrl.getProducts
);

router.get(
  "/:productId",
  [authJwt.verifyToken, authJwt.isAdmin, verifyProduct.existProduct],
  productCtrl.getProductById
);

//busca producto por code
router.get(
  "/c/:code",
  productCtrl.getProductByCode
);

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  productCtrl.createProduct
);

router.put(
  "/:productId",
  [authJwt.verifyToken, authJwt.isAdmin, verifyProduct.existProduct],
  productCtrl.updateProductById
);

router.delete(
  "/:productId",
  [authJwt.verifyToken, authJwt.isAdmin, verifyProduct.existProduct],
  productCtrl.deleteProductById
);

//productos disponibles por categoria
router.get(
  "/category/a/:categoryId", 
  [verifyProduct.existCategory],
  productCtrl.getProductByCategoryIdA
);

//productos no disponibles por categoria
router.get(
  "/category/na/:categoryId", 
  [authJwt.verifyToken,authJwt.isAdmin,verifyProduct.existCategory],
  productCtrl.getProductByCategoryIdNoA
);

//todos los productos por categoria
router.get(
  "/category/:categoryId",
  [authJwt.verifyToken,authJwt.isAdmin,  verifyProduct.existCategory],
  productCtrl.getProductByCategoryId
);


router.patch("/defaul/image/:productId",productCtrl.updateDefaultImage)

//Router images

router.post(
  "/images/upload/:idProduct",
  [ authJwt.verifyToken,upload.array("files", 12)],
  imageCtrl.uploadImgs
);

router.get("/images/names/:productId", imageCtrl.showNameImgs);
router.get("/images/:size/:filename", imageCtrl.sendFile);
router.delete("/images/:publicname",imageCtrl.destroyImage);
export default router;
