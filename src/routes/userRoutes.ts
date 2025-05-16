import express from "express";
import {
  getUsers,
  updateUser,
  getUserById,
} from "../controllers/userController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs (owner et tenant)
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer la liste des utilisateurs avec filtres
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filtrer par type (OWNER ou TENANT)
 *       - in: query
 *         name: nom
 *         schema:
 *           type: string
 *         description: Filtrer par nom
 *       - in: query
 *         name: prenom
 *         schema:
 *           type: string
 *         description: Filtrer par prénom
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 */
router.get("/", getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Données de l'utilisateur
 */
router.get("/:id", getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Modifier un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               USEC_LNAME:
 *                 type: string
 *               USEC_FNAME:
 *                 type: string
 *               USEC_ADDRESS:
 *                 type: string
 *               USEC_TEL:
 *                 type: string
 *               USEC_BIO:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur modifié avec succès
 */
router.put("/:id", updateUser);

export default router;
