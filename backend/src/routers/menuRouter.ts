import express from 'express';
import { isLoggedIn } from '../middleware/authentication.js';
import { isSuperAdmin } from '../middleware/superAdmin.js';
import { createMenu, deleteMenu, getAllMenuTemplates, getMenuByName, updateMenu } from '../controllers/menuController.js';

const router = express.Router();

// Routes for Menus
router.get('/', getAllMenuTemplates);
router.get('/:name', getMenuByName);
router.post('/add-menu', isLoggedIn, isSuperAdmin, createMenu);
router.put('/:id',isLoggedIn, isSuperAdmin, updateMenu);
router.delete('/:id',isLoggedIn, isSuperAdmin, deleteMenu);

export default router;
 