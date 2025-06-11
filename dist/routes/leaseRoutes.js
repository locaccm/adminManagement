"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leaseController_1 = require("../controllers/leaseController");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Leases
 *   description: Management of rental leases
 */
/**
 * @swagger
 * /leases:
 *   get:
 *     summary: Retrieve leases associated with a user
 *     tags: [Leases]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user (owner or tenant)
 *     responses:
 *       200:
 *         description: List of leases successfully retrieved
 *       400:
 *         description: Missing userId parameter
 *       500:
 *         description: Server error
 */
router.get("/", leaseController_1.getLeases);
/**
 * @swagger
 * /leases:
 *   post:
 *     summary: Create a new lease
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
 *         description: Lease successfully created
 *       500:
 *         description: Error while creating the lease
 */
router.post("/", leaseController_1.createLease);
/**
 * @swagger
 * /leases/{id}:
 *   put:
 *     summary: Update an existing lease
 *     tags: [Leases]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the lease to update
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
 *         description: Lease successfully updated
 *       500:
 *         description: Server error
 */
router.put("/:id", leaseController_1.updateLease);
/**
 * @swagger
 * /leases/{id}:
 *   delete:
 *     summary: Delete a lease
 *     tags: [Leases]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the lease to delete
 *     responses:
 *       200:
 *         description: Lease successfully deleted
 *       500:
 *         description: Server error
 */
router.delete("/:id", leaseController_1.deleteLease);
exports.default = router;
