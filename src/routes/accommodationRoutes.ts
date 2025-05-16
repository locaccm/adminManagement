import express from "express";
import {
  getAccommodations,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
} from "../controllers/accommodationController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Accommodations
 *   description: Gestion des logements proposés par les propriétaires
 */

/**
 * @swagger
 * /accommodations:
 *   get:
 *     summary: Récupérer tous les logements d’un propriétaire
 *     tags: [Accommodations]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur (owner)
 *     responses:
 *       200:
 *         description: Liste des logements récupérée
 *       400:
 *         description: userId requis
 *       500:
 *         description: Erreur serveur
 */
router.get("/", getAccommodations);

/**
 * @swagger
 * /accommodations:
 *   post:
 *     summary: Créer un nouveau logement
 *     tags: [Accommodations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ACCC_NAME
 *               - ACCC_TYPE
 *               - ACCC_ADDRESS
 *               - ACCC_DESC
 *             properties:
 *               ACCC_NAME:
 *                 type: string
 *               ACCC_TYPE:
 *                 type: string
 *               ACCC_ADDRESS:
 *                 type: string
 *               ACCC_DESC:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logement créé
 *       500:
 *         description: Erreur serveur
 */
router.post("/", createAccommodation);

/**
 * @swagger
 * /accommodations/{id}:
 *   put:
 *     summary: Mettre à jour un logement existant
 *     tags: [Accommodations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du logement
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ACCC_NAME:
 *                 type: string
 *               ACCC_TYPE:
 *                 type: string
 *               ACCC_ADDRESS:
 *                 type: string
 *               ACCC_DESC:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logement mis à jour
 *       500:
 *         description: Erreur serveur
 */
router.put("/:id", updateAccommodation);

/**
 * @swagger
 * /accommodations/{id}:
 *   delete:
 *     summary: Supprimer un logement
 *     tags: [Accommodations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du logement
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Logement supprimé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", deleteAccommodation);

export default router;
