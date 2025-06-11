"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventController_1 = require("../controllers/eventController");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Management of events (meetings, inspections, etc.)
 */
/**
 * @swagger
 * /events:
 *   get:
 *     summary: Retrieve events based on the connected user
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user (tenant or owner)
 *     responses:
 *       200:
 *         description: List of events retrieved successfully
 *       400:
 *         description: userId is required
 *       500:
 *         description: Server error
 */
router.get("/", eventController_1.getEvents);
/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Retrieve a specific event by its ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event found
 *       500:
 *         description: Server error
 */
router.get("/:id", eventController_1.getEventById);
/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
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
 *         description: Event successfully created
 *       500:
 *         description: Server error
 */
router.post("/", eventController_1.createEvent);
/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an existing event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event to update
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
 *         description: Event successfully updated
 *       500:
 *         description: Server error
 */
router.put("/:id", eventController_1.updateEvent);
/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event successfully deleted
 *       500:
 *         description: Server error
 */
router.delete("/:id", eventController_1.deleteEvent);
exports.default = router;
