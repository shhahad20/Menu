import express from 'express';
import * as menuItemController from '../../controllers/menuControllers/ItemController.js';
import { uploadMiddleware } from '../../middleware/upload.js';
import { isLoggedIn } from '../../middleware/authentication.js';
import { verifyOwnership } from '../../middleware/ownerShip.js';

const router = express.Router();

router.get('/',isLoggedIn, menuItemController.getMenuItems);
router.get('/:id', isLoggedIn, menuItemController.getMenuItem);
router.post('/',isLoggedIn,uploadMiddleware , menuItemController.createMenuItem);
router.put('/:id',isLoggedIn,uploadMiddleware, menuItemController.updateMeuItem);

router.delete('/:id',isLoggedIn, menuItemController.deleteMenuItem);

export default router;
