import { Router } from 'express';
import { About, Contact, Home } from '../controllers/basicControllers.js';

const router = Router();

router.get('/',Home);
router.get('/about',About);
router.get('/contact',Contact);

export default router;