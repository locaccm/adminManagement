import { Request, Response } from 'express';
import prisma from '../lib/prisma';

/**
 * Get all leases (rental contracts) for a specific user.
 * Requires `userId` in query parameters.
 */
export const getLeases = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.query.userId as string);
  if (!userId) {
    res.status(400).json({ error: 'userId is required' });
    return;
  }

  try {
    const leases = await prisma.lease.findMany({
      where: { USEN_ID: userId },
    });
    res.json(leases);
  } catch {
    res.status(500).json({ error: 'Server error while fetching leases' });
  }
};

/**
 * Create a new lease.
 * Expects lease data in the request body.
 */
export const createLease = async (req: Request, res: Response): Promise<void> => {
  const lease = await prisma.lease.create({ data: req.body });
  res.json(lease);
};

/**
 * Update an existing lease by ID.
 * Expects lease ID as a route parameter and update data in the request body.
 */
export const updateLease = async (req: Request, res: Response): Promise<void> => {
  const lease = await prisma.lease.update({
    where: { LEAN_ID: parseInt(req.params.id) },
    data: req.body,
  });
  res.json(lease);
};

/**
 * Delete a lease by ID.
 * Expects lease ID as a route parameter.
 */
export const deleteLease = async (req: Request, res: Response): Promise<void> => {
  await prisma.lease.delete({ where: { LEAN_ID: parseInt(req.params.id) } });
  res.json({ message: 'Lease deleted.' });
};
