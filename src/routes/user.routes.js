import { Router } from "express";
const router = Router();

import {userCtrl} from "../controllers";
import { authJwt, verifySignup } from "../middlewares";

router.post(
  "/",
  [authJwt.verifyToken,authJwt.isAdmin],
  userCtrl.createUser
);
router.get(
  "/",
  [authJwt.verifyToken],
  userCtrl.getUsers
);
export default router;
