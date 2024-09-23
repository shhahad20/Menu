import express from 'express';
import { isLoggenIn } from '../middleware/authentication.js';
import { isSuperAdmin } from '../middleware/superAdmin.js';
import { createMenu, deleteMenu, getAllMenuTemplates, getMenuByName, updateMenu } from '../controllers/menuController.js';
const router = express.Router();
// Routes for Menus
router.get('/', getAllMenuTemplates);
router.get('/:name', getMenuByName);
router.post('/add-menu', isLoggenIn, isSuperAdmin, createMenu);
router.put('/:id', isLoggenIn, isSuperAdmin, updateMenu);
router.delete('/:id', isLoggenIn, isSuperAdmin, deleteMenu);
export default router;
