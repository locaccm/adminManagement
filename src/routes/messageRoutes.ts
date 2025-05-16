import express from "express";
import {
  getMessages,
  markAsRead,
  deleteMessage,
} from "../controllers/messageController";

const router = express.Router();

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
router.get("/", getMessages as any);

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
router.put("/:id/read", markAsRead);

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
router.delete("/:id", deleteMessage);

export default router;
