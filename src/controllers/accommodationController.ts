import { Request, Response } from 'express';
import prisma from '../lib/prisma';

/**
 * Get all accommodations for a specific user (usually an OWNER).
 * Expects `userId` as a query parameter.
 */
export const getAccommodations = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.query.userId as string);
  if (!userId) {
    res.status(400).json({ error: 'userId is required' });
    return;
  }

  try {
    const accommodations = await prisma.accommodation.findMany({
      where: { USEN_ID: userId },
    });
    res.json(accommodations);
  } catch {
    res.status(500).json({ error: 'Server error while retrieving accommodations' });
  }
};

/**
 * Create a new accommodation.
 * Expects accommodation data in the request body.
 */
export const createAccommodation = async (req: Request, res: Response): Promise<void> => {
  const accommodation = await prisma.accommodation.create({ data: req.body });
  res.json(accommodation);
};

/**
 * Update an existing accommodation by ID.
 * Expects updated data in the request body.
 */
export const updateAccommodation = async (req: Request, res: Response): Promise<void> => {
  const accommodation = await prisma.accommodation.update({
    where: { ACCN_ID: parseInt(req.params.id) },
    data: req.body,
  });
  res.json(accommodation);
};

/**
 * Delete an accommodation by ID.
 */
export const deleteAccommodation = async (req: Request, res: Response): Promise<void> => {
  await prisma.accommodation.delete({ where: { ACCN_ID: parseInt(req.params.id) } });
  res.json({ message: 'Accommodation deleted successfully.' });
};
