import express from 'express';
import {
  getLeases,
  createLease,
  updateLease,
  deleteLease
} from '../controllers/leaseController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Leases
 *   description: Gestion des baux (contrats de location)
 */

/**
 * @swagger
 * /leases:
 *   get:
 *     summary: Récupérer les baux liés à un utilisateur
 *     tags: [Leases]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur (owner ou tenant)
 *     responses:
 *       200:
 *         description: Liste des baux récupérée avec succès
 *       400:
 *         description: Paramètre userId manquant
 *       500:
 *         description: Erreur serveur
 */
router.get('/', getLeases);

/**
 * @swagger
 * /leases:
 *   post:
 *     summary: Créer un nouveau bail
 *     tags: [Leases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               LEAD_START:
 *                 type: string
 *                 format: date
 *               LEAD_END:
 *                 type: string
 *                 format: date
 *               LEAN_RENT:
 *                 type: number
 *               LEAN_CHARGES:
 *                 type: number
 *               LEAD_PAYMENT:
 *                 type: string
 *                 format: date
 *               USEN_ID:
 *                 type: integer
 *               ACCN_ID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Bail créé avec succès
 *       500:
 *         description: Erreur lors de la création du bail
 */
router.post('/', createLease);

/**
 * @swagger
 * /leases/{id}:
 *   put:
 *     summary: Mettre à jour un bail existant
 *     tags: [Leases]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du bail à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               LEAD_START:
 *                 type: string
 *               LEAD_END:
 *                 type: string
 *               LEAN_RENT:
 *                 type: number
 *               LEAN_CHARGES:
 *                 type: number
 *               LEAD_PAYMENT:
 *                 type: string
 *               USEN_ID:
 *                 type: integer
 *               ACCN_ID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Bail mis à jour
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', updateLease);

/**
 * @swagger
 * /leases/{id}:
 *   delete:
 *     summary: Supprimer un bail
 *     tags: [Leases]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du bail à supprimer
 *     responses:
 *       200:
 *         description: Bail supprimé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', deleteLease);

export default router;
