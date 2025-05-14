import express from 'express';
import { getEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/eventController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Gestion des événements (réunions, inspections, etc.)
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Récupérer les événements selon l'utilisateur connecté
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur (tenant ou owner)
 *     responses:
 *       200:
 *         description: Liste des événements récupérée
 *       400:
 *         description: userId requis
 *       500:
 *         description: Erreur serveur
 */
router.get('/', getEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Récupérer un événement par son ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'événement
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Événement trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', getEventById);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Créer un nouvel événement
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EVEC_LIB:
 *                 type: string
 *               EVED_START:
 *                 type: string
 *                 format: date-time
 *               EVED_END:
 *                 type: string
 *                 format: date-time
 *               USEN_ID:
 *                 type: integer
 *               ACCN_ID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Événement créé
 *       500:
 *         description: Erreur serveur
 */
router.post('/', createEvent);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Modifier un événement existant
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'événement à modifier
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EVEC_LIB:
 *                 type: string
 *               EVED_START:
 *                 type: string
 *                 format: date-time
 *               EVED_END:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Événement mis à jour
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', updateEvent);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Supprimer un événement
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'événement à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Événement supprimé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', deleteEvent);

export default router;
