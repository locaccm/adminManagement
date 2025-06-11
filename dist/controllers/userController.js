"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.updateUser = exports.getUsers = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
/**
 * Get a list of users, with optional filters for type, last name, and first name.
 */
const getUsers = async (req, res) => {
    const { type, nom, prenom } = req.query;
    try {
        const users = await prisma_1.default.user.findMany({
            where: {
                USEC_TYPE: type ? String(type) : undefined,
                USEC_LNAME: nom ? { contains: String(nom) } : undefined,
                USEC_FNAME: prenom ? { contains: String(prenom) } : undefined,
            },
        });
        res.json(users);
    }
    catch {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};
exports.getUsers = getUsers;
/**
 * Update user details by user ID.
 */
const updateUser = async (req, res) => {
    const userId = parseInt(req.params.id);
    const { USEC_LNAME, USEC_FNAME, USEC_ADDRESS, USEC_TEL, USEC_BIO } = req.body;
    try {
        const user = await prisma_1.default.user.update({
            where: { USEN_ID: userId },
            data: { USEC_LNAME, USEC_FNAME, USEC_ADDRESS, USEC_TEL, USEC_BIO },
        });
        res.json(user);
    }
    catch {
        res.status(500).json({ error: "Failed to update user" });
    }
};
exports.updateUser = updateUser;
/**
 * Get a single user by ID.
 */
const getUserById = async (req, res) => {
    const userId = parseInt(req.params.id);
    try {
        const user = await prisma_1.default.user.findUnique({
            where: { USEN_ID: userId },
        });
        res.json(user);
    }
    catch {
        res.status(500).json({ error: "Failed to fetch user" });
    }
};
exports.getUserById = getUserById;
