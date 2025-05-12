import express from 'express';
import {
  getAccommodations,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation
} from '../controllers/accommodationController';

const router = express.Router();

router.get('/', getAccommodations);
router.post('/', createAccommodation);
router.put('/:id', updateAccommodation);
router.delete('/:id', deleteAccommodation);

export default router;
