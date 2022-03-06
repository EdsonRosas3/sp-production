import { Router } from "express";
const router = Router();

import {categoryCtrl} from "../controllers";
import { authJwt, } from "../middlewares";


router.get(
  "/", 
  categoryCtrl.allCategory
);
export default router;