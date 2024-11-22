import express from 'express';
import * as menuItemController from '../../controllers/menuControllers/ItemController.js';
import { uploadMiddleware } from '../../middleware/upload.js';
import { isLoggedIn } from '../../middleware/authentication.js';

const router = express.Router();

router.get('/', menuItemController.getMenuItems);
router.get('/:id', menuItemController.getMenuItem);
router.post('/',isLoggedIn,uploadMiddleware , menuItemController.createMenuItem);
router.put('/:id', menuItemController.updateMeuItem);

router.delete('/:id', menuItemController.deleteMenuItem);

export default router;
