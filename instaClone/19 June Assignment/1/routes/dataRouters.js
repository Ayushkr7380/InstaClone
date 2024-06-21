import { Router } from 'express'
import { men, other, women } from '../controllers/dummyData.js';

const router = Router();

router.get('/',(req,res,next)=>{
    res.status(200).send('Welcome to Men and Women Dummy Data')
})

router.get('/men',men);

router.get('/women',women);
router.get('/other',other);

export default router;