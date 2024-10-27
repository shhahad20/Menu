import express from 'express';
import * as menuItemController from '../../controllers/menuControllers/ItemController.js';

const router = express.Router();

router.get('/', menuItemController.getMenuItems);
router.get('/:id', menuItemController.getMenuItem);
router.post('/', menuItemController.createMenuItem);
router.put('/:id', menuItemController.updateMeuItem);

router.delete('/:id', menuItemController.deleteMenuItem);

export default router;
