"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../controllers/messageController");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: User message management
 */
/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Retrieve messages for a specific user
 *     tags: [Messages]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user whose messages should be retrieved
 *     responses:
 *       200:
 *         description: List of messages
 *       400:
 *         description: Missing userId
 *       500:
 *         description: Server error
 */
router.get("/", messageController_1.getMessages);
/**
 * @swagger
 * /messages/{id}/read:
 *   put:
 *     summary: Mark a message as read
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the message to update
 *     responses:
 *       200:
 *         description: Message marked as read
 *       500:
 *         description: Server error
 */
router.put("/:id/read", messageController_1.markAsRead);
/**
 * @swagger
 * /messages/{id}:
 *   delete:
 *     summary: Delete a message
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the message to delete
 *     responses:
 *       200:
 *         description: Message successfully deleted
 *       500:
 *         description: Server error
 */
router.delete("/:id", messageController_1.deleteMessage);
exports.default = router;
