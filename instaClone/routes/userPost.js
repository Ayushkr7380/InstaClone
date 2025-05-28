import { Router } from 'express';
import LoggedIn from '../middlewares/user.LoggedIn.js';
import { allLikes, commentPage, commentPost, home, likePost, othersProfile, postDelete, postEdit, userPost, viewPost } from '../controllers/userPost.controllers.js';
import upload from '../middlewares/multer.middleware.js'


const router = Router();

router.post('/post',LoggedIn,upload.single("photo"),userPost);
router.get('/viewpost/:id',LoggedIn,viewPost);
router.get('/postdelete/:id',LoggedIn,postDelete);
router.post('/postedit/:id',LoggedIn,postEdit);
router.get('/home',LoggedIn,home);
router.get('/othersprofile/:id',LoggedIn,othersProfile);

router.post('/like',LoggedIn,likePost);
router.post('/comment',LoggedIn,commentPost);
router.get('/comment/:id',LoggedIn,commentPage)
router.get('/alllikes/:id',LoggedIn,allLikes)

export default router;