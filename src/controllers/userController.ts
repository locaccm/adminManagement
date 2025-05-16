import { Request, Response } from "express";
import prisma from "../lib/prisma";

/**
 * Get a list of users, with optional filters for type, last name, and first name.
 */
export const getUsers = async (req: Request, res: Response) => {
  const { type, nom, prenom } = req.query;

  try {
    const users = await prisma.user.findMany({
      where: {
        USEC_TYPE: type ? String(type) : undefined,
        USEC_LNAME: nom ? { contains: String(nom) } : undefined,
        USEC_FNAME: prenom ? { contains: String(prenom) } : undefined,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

/**
 * Update user details by user ID.
 */
export const updateUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const { USEC_LNAME, USEC_FNAME, USEC_ADDRESS, USEC_TEL, USEC_BIO } = req.body;

  try {
    const user = await prisma.user.update({
      where: { USEN_ID: userId },
      data: { USEC_LNAME, USEC_FNAME, USEC_ADDRESS, USEC_TEL, USEC_BIO },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

/**
 * Get a single user by ID.
 */
export const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  try {
    const user = await prisma.user.findUnique({
      where: { USEN_ID: userId },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};
