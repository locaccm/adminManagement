import express from 'express';
import {
  getLeases,
  createLease,
  updateLease,
  deleteLease
} from '../controllers/leaseController';

const router = express.Router();

router.get('/', getLeases);
router.post('/', createLease);
router.put('/:id', updateLease);
router.delete('/:id', deleteLease);

export default router;
