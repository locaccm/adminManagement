"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.markAsRead = exports.getMessages = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
/**
 * Get all messages related to a user (as sender or receiver).
 * Filters based on `userId` passed in query parameters.
 * Includes receiver's first and last name.
 */
const getMessages = async (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        res.status(400).json({ error: "userId is required" });
        return;
    }
    try {
        const messages = await prisma_1.default.message.findMany({
            where: {
                OR: [
                    { MESN_SENDER: parseInt(userId) },
                    { MESN_RECEIVER: parseInt(userId) },
                ],
            },
            include: {
                receiver: {
                    select: {
                        USEC_FNAME: true,
                        USEC_LNAME: true,
                    },
                },
            },
            orderBy: { MESD_DATE: "desc" },
        });
        res.json(messages);
    }
    catch {
        res.status(500).json({ error: "Server error while fetching messages" });
    }
};
exports.getMessages = getMessages;
/**
 * Mark a message as read by updating `MESB_NEW` to false.
 */
const markAsRead = async (req, res) => {
    const message = await prisma_1.default.message.update({
        where: { MESN_ID: parseInt(req.params.id) },
        data: { MESB_NEW: false },
    });
    res.json(message);
};
exports.markAsRead = markAsRead;
/**
 * Delete a message by its ID.
 */
const deleteMessage = async (req, res) => {
    await prisma_1.default.message.delete({
        where: { MESN_ID: parseInt(req.params.id) },
    });
    res.json({ message: "Message deleted." });
};
exports.deleteMessage = deleteMessage;
