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
 *   description: Management of accommodations offered by owners
 */

/**
 * @swagger
 * /accommodations:
 *   get:
 *     summary: Retrieve all accommodations for a specific owner
 *     tags: [Accommodations]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user (owner)
 *     responses:
 *       200:
 *         description: List of accommodations retrieved successfully
 *       400:
 *         description: userId is required
 *       500:
 *         description: Server error
 */
router.get("/", getAccommodations);

/**
 * @swagger
 * /accommodations:
 *   post:
 *     summary: Create a new accommodation
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
 *         description: Accommodation created successfully
 *       500:
 *         description: Server error
 */
router.post("/", createAccommodation);

/**
 * @swagger
 * /accommodations/{id}:
 *   put:
 *     summary: Update an existing accommodation
 *     tags: [Accommodations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the accommodation to update
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
 *         description: Accommodation updated successfully
 *       500:
 *         description: Server error
 */
router.put("/:id", updateAccommodation);

/**
 * @swagger
 * /accommodations/{id}:
 *   delete:
 *     summary: Delete an accommodation
 *     tags: [Accommodations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the accommodation to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Accommodation deleted successfully
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteAccommodation);

export default router;
