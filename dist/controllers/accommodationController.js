"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccommodation = exports.updateAccommodation = exports.createAccommodation = exports.getAccommodations = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
/**
 * Get all accommodations for a specific user (usually an OWNER).
 * Expects `userId` as a query parameter.
 */
const getAccommodations = async (req, res) => {
    const userId = parseInt(req.query.userId);
    if (!userId) {
        res.status(400).json({ error: "userId is required" });
        return;
    }
    try {
        const accommodations = await prisma_1.default.accommodation.findMany({
            where: { USEN_ID: userId },
        });
        res.json(accommodations);
    }
    catch {
        res
            .status(500)
            .json({ error: "Server error while retrieving accommodations" });
    }
};
exports.getAccommodations = getAccommodations;
/**
 * Create a new accommodation.
 * Expects accommodation data in the request body.
 */
const createAccommodation = async (req, res) => {
    const accommodation = await prisma_1.default.accommodation.create({ data: req.body });
    res.json(accommodation);
};
exports.createAccommodation = createAccommodation;
/**
 * Update an existing accommodation by ID.
 * Expects updated data in the request body.
 */
const updateAccommodation = async (req, res) => {
    const accommodation = await prisma_1.default.accommodation.update({
        where: { ACCN_ID: parseInt(req.params.id) },
        data: req.body,
    });
    res.json(accommodation);
};
exports.updateAccommodation = updateAccommodation;
/**
 * Delete an accommodation by ID.
 */
const deleteAccommodation = async (req, res) => {
    await prisma_1.default.accommodation.delete({
        where: { ACCN_ID: parseInt(req.params.id) },
    });
    res.json({ message: "Accommodation deleted successfully." });
};
exports.deleteAccommodation = deleteAccommodation;
