"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Management of users (owners and tenants)
 */
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve the list of users with optional filters
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by user type (OWNER or TENANT)
 *       - in: query
 *         name: nom
 *         schema:
 *           type: string
 *         description: Filter by last name
 *       - in: query
 *         name: prenom
 *         schema:
 *           type: string
 *         description: Filter by first name
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 */
router.get("/", userController_1.getUsers);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 */
router.get("/:id", userController_1.getUserById);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to update
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
 *         description: User updated successfully
 */
router.put("/:id", userController_1.updateUser);
exports.default = router;
