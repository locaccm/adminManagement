import express from 'express';
import {
  getUsers,
  updateUser,
  getUserById,
} from '../controllers/userController';

const router = express.Router();

// Obtenir la liste des utilisateurs avec filtres
router.get('/', getUsers);

// Modifier un utilisateur par ID
router.put('/:id', updateUser);
router.get('/:id', getUserById);

export default router;
