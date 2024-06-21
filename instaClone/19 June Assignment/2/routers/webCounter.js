import { Router } from 'express';
import { decrementCounter, incrementCounter, showCounter } from '../controllers/counterController.js';

const router = Router();

router.get('/',showCounter);
router.get('/increment',incrementCounter);
router.get('/decrement',decrementCounter);

export default router;