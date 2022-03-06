import { Router } from "express";
import AuthRouter from "./auth.routes";
import ProductRouter from "./products.routes";
import UserRouter from "./user.routes";
import CategoryRouter from "./category.routes";
import ServiceRouter from "./service.routes";
import TypeServiceRouter from "./typeservice.routes";
import HomeImagesRouter from "./homeImages.routes";

const router = Router();

router.use("/auth",AuthRouter);
router.use("/products",ProductRouter);
router.use("/users",UserRouter);
router.use("/categories",CategoryRouter);
router.use("/services",ServiceRouter);
router.use("/typeservices",TypeServiceRouter);
router.use("/media",HomeImagesRouter);

export default router;