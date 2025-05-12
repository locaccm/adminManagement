import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAccommodations = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.query.userId as string);
  if (!userId) {
    res.status(400).json({ error: 'userId requis' });
    return;
  }

  try {
    const accommodations = await prisma.accommodation.findMany({
      where: { USEN_ID: userId },
    });
    res.json(accommodations);
  } catch {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

export const createAccommodation = async (req: Request, res: Response): Promise<void> => {
  const accommodation = await prisma.accommodation.create({ data: req.body });
  res.json(accommodation);
};

export const updateAccommodation = async (req: Request, res: Response): Promise<void> => {
  const accommodation = await prisma.accommodation.update({
    where: { ACCN_ID: parseInt(req.params.id) },
    data: req.body,
  });
  res.json(accommodation);
};

export const deleteAccommodation = async (req: Request, res: Response): Promise<void> => {
  await prisma.accommodation.delete({ where: { ACCN_ID: parseInt(req.params.id) } });
  res.json({ message: 'Logement supprimé.' });
};
