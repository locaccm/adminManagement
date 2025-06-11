"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLease = exports.updateLease = exports.createLease = exports.getLeases = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
/**
 * Get all leases (rental contracts) for a specific user.
 * Requires `userId` in query parameters.
 */
const getLeases = async (req, res) => {
    const userId = parseInt(req.query.userId);
    if (!userId) {
        res.status(400).json({ error: "userId is required" });
        return;
    }
    try {
        const leases = await prisma_1.default.lease.findMany({
            where: { USEN_ID: userId },
        });
        res.json(leases);
    }
    catch {
        res.status(500).json({ error: "Server error while fetching leases" });
    }
};
exports.getLeases = getLeases;
/**
 * Create a new lease.
 * Expects lease data in the request body.
 */
const createLease = async (req, res) => {
    const lease = await prisma_1.default.lease.create({ data: req.body });
    res.json(lease);
};
exports.createLease = createLease;
/**
 * Update an existing lease by ID.
 * Expects lease ID as a route parameter and update data in the request body.
 */
const updateLease = async (req, res) => {
    const lease = await prisma_1.default.lease.update({
        where: { LEAN_ID: parseInt(req.params.id) },
        data: req.body,
    });
    res.json(lease);
};
exports.updateLease = updateLease;
/**
 * Delete a lease by ID.
 * Expects lease ID as a route parameter.
 */
const deleteLease = async (req, res) => {
    await prisma_1.default.lease.delete({ where: { LEAN_ID: parseInt(req.params.id) } });
    res.json({ message: "Lease deleted." });
};
exports.deleteLease = deleteLease;
