import express from 'express';
import { createPricing, deletePricing, getPricing, getPricingById, updatePricing } from '../controllers/pricingController.js';
import { isLoggenIn } from '../middleware/authentication.js';
import { isSuperAdmin } from '../middleware/superAdmin.js';

const router = express.Router();

// Routes for pricing
router.get('/', getPricing);
router.get('/:id/:name?', getPricingById);
router.post('/add-pricing', isLoggenIn, isSuperAdmin, createPricing);
router.put('/:id',isLoggenIn, isSuperAdmin, updatePricing);
router.delete('/:id',isLoggenIn, isSuperAdmin, deletePricing);

export default router;
 