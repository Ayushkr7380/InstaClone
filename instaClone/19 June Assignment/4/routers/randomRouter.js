import { Router } from 'express';
import random from '../controllers/randomController.js';
import randonNumberGenerator from '../middlewares/randomNumber.js';

const router = Router();

router.get('/random',randonNumberGenerator,random);

export default router;