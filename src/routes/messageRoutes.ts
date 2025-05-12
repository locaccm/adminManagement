import express from 'express';
import {
  getMessages,
  markAsRead,
  deleteMessage
} from '../controllers/messageController';

const router = express.Router();

router.get('/', getMessages as any);
router.put('/:id/read', markAsRead);
router.delete('/:id', deleteMessage);

export default router;
