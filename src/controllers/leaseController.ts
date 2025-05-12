import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getLeases = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.query.userId as string);
  if (!userId) {
    res.status(400).json({ error: 'userId requis' });
    return;
  }

  try {
    const leases = await prisma.lease.findMany({
      where: { USEN_ID: userId },
    });
    res.json(leases);
  } catch {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

export const createLease = async (req: Request, res: Response): Promise<void> => {
  const lease = await prisma.lease.create({ data: req.body });
  res.json(lease);
};

export const updateLease = async (req: Request, res: Response): Promise<void> => {
  const lease = await prisma.lease.update({
    where: { LEAN_ID: parseInt(req.params.id) },
    data: req.body,
  });
  res.json(lease);
};

export const deleteLease = async (req: Request, res: Response): Promise<void> => {
  await prisma.lease.delete({ where: { LEAN_ID: parseInt(req.params.id) } });
  res.json({ message: 'Bail supprimé.' });
};
