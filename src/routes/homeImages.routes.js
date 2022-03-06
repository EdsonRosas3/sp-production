import { Router } from "express";
import { homeImagesCtrl } from "../controllers";

import { upload } from "../imgConfiguration";

const router = Router();

router.get("/images/lg/:filename", homeImagesCtrl.sendFileLg);
router.get("/images/md/:filename", homeImagesCtrl.sendFileMd);
router.get("/images/sm/:filename", homeImagesCtrl.sendFileSm);

router.get("/images/login",homeImagesCtrl.sendImgeLogin);

export default router;