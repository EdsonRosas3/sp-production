import { Router } from "express";
const router = Router();

import {typeServiceCtrl} from "../controllers";
import { authJwt, } from "../middlewares";


router.get(
  "/", 
  typeServiceCtrl.allTypeService
);
export default router;