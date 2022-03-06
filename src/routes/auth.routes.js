import { Router } from "express";
const router = Router();

import {authCtrl} from "../controllers";
import { verifySignup } from "../middlewares";



router.post(
  "/signup",
  [verifySignup.checkDuplicateUsernameOrEmail],
  authCtrl.signUp
);

router.post(
  "/signin", 
  authCtrl.signin
);


export default router;
