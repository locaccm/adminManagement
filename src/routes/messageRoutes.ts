import express from 'express';
import {
  getMessages,
  markAsRead,
  deleteMessage
} from '../controllers/messageController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Gestion des messages utilisateurs
 */

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Récupère les messages d'un utilisateur
 *     tags: [Messages]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur concerné
 *     responses:
 *       200:
 *         description: Liste des messages
 *       400:
 *         description: ID manquant
 *       500:
 *         description: Erreur serveur
 */
router.get('/', getMessages as any);

/**
 * @swagger
 * /messages/{id}/read:
 *   put:
 *     summary: Marquer un message comme lu
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du message à mettre à jour
 *     responses:
 *       200:
 *         description: Message mis à jour
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id/read', markAsRead);

/**
 * @swagger
 * /messages/{id}:
 *   delete:
 *     summary: Supprimer un message
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du message à supprimer
 *     responses:
 *       200:
 *         description: Message supprimé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', deleteMessage);

export default router;
