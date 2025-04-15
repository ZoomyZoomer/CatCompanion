import express from 'express';

import { getAdventureByCategory, getAllAdventures } from '../controllers/adventureController';

const router = express.Router();

router.get('/', getAllAdventures);
router.get('/:categoryId', getAdventureByCategory);

export default router;
