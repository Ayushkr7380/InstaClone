import { Router } from 'express';
import { updateProfile, userDetails, userLogin, userLoginGet, userLogout, userRegister, userRegisterGet } from '../controllers/userAuth.controllers.js';
import LoggedIn from '../middlewares/user.LoggedIn.js';

import upload from '../middlewares/multer.middleware.js';
import loginDataValidator from '../middlewares/loginDataValidator.js';
import signUpDataValidator from '../middlewares/signUpDataValidator.js';
const router = Router();


router.post('/register',signUpDataValidator,userRegister);
router.get('/register',userRegisterGet);

router.post('/login',loginDataValidator,userLogin);
router.get('/login',userLoginGet);

router.get('/getuser',LoggedIn,userDetails);
router.get('/logout',LoggedIn,userLogout);

router.post('/updateprofile',LoggedIn,upload.single("profilephoto"),updateProfile);

export default router;