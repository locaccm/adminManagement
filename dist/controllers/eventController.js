"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getEventById = exports.getEvents = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
/**
 * Get all events related to a user.
 * - If the user is an OWNER, fetches events they created.
 * - If the user is a TENANT, fetches events linked to their currently rented accommodation.
 */
const getEvents = async (req, res) => {
    const userId = parseInt(req.query.userId);
    if (!userId) {
        res.status(400).json({ error: "userId is required" });
        return;
    }
    try {
        const user = await prisma_1.default.user.findUnique({
            where: { USEN_ID: userId },
            select: { USEC_TYPE: true },
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        if (user.USEC_TYPE === "OWNER") {
            const events = await prisma_1.default.event.findMany({
                where: { USEN_ID: userId },
            });
            res.json(events);
            return;
        }
        const lease = await prisma_1.default.lease.findFirst({
            where: { USEN_ID: userId, LEAB_ACTIVE: true },
            select: { ACCN_ID: true },
        });
        if (!lease) {
            res.json([]);
            return;
        }
        const events = await prisma_1.default.event.findMany({
            where: { ACCN_ID: lease.ACCN_ID },
        });
        res.json(events);
    }
    catch {
        res.status(500).json({ error: "Server error while retrieving events" });
    }
};
exports.getEvents = getEvents;
/**
 * Get a single event by its ID.
 */
const getEventById = async (req, res) => {
    const event = await prisma_1.default.event.findUnique({
        where: { EVEN_ID: parseInt(req.params.id) },
    });
    res.json(event);
};
exports.getEventById = getEventById;
/**
 * Create a new event.
 * Expects event data in the request body.
 */
const createEvent = async (req, res) => {
    const { EVEC_LIB, EVED_START, EVED_END, USEN_ID, ACCN_ID } = req.body;
    const event = await prisma_1.default.event.create({
        data: { EVEC_LIB, EVED_START, EVED_END, USEN_ID, ACCN_ID },
    });
    res.json(event);
};
exports.createEvent = createEvent;
/**
 * Update an existing event by ID.
 * Expects updated data in the request body.
 */
const updateEvent = async (req, res) => {
    const event = await prisma_1.default.event.update({
        where: { EVEN_ID: parseInt(req.params.id) },
        data: req.body,
    });
    res.json(event);
};
exports.updateEvent = updateEvent;
/**
 * Delete an event by ID.
 */
const deleteEvent = async (req, res) => {
    await prisma_1.default.event.delete({
        where: { EVEN_ID: parseInt(req.params.id) },
    });
    res.json({ message: "Event deleted successfully." });
};
exports.deleteEvent = deleteEvent;
