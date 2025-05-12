import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getEvents = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.query.userId as string);
    if (!userId) {
      res.status(400).json({ error: 'userId requis' });
      return;
    }
  
    try {
      const user = await prisma.user.findUnique({
        where: { USEN_ID: userId },
        select: { USEC_TYPE: true },
      });
  
      if (!user) {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
        return;
      }
  
      if (user.USEC_TYPE === 'OWNER') {
        const events = await prisma.event.findMany({
          where: { USEN_ID: userId },
        });
        res.json(events);
        return;
      }
  
      // Si TENANT, trouver logement lié via bail actif
      const lease = await prisma.lease.findFirst({
        where: { USEN_ID: userId, LEAB_ACTIVE: true },
        select: { ACCN_ID: true },
      });
  
      if (!lease) {
        res.json([]);
        return;
      }
  
      const events = await prisma.event.findMany({
        where: { ACCN_ID: lease.ACCN_ID },
      });
  
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  };
  
export const getEventById = async (req: Request, res: Response) => {
  const event = await prisma.event.findUnique({
    where: { EVEN_ID: parseInt(req.params.id) },
  });
  res.json(event);
};

export const createEvent = async (req: Request, res: Response) => {
  const { EVEC_LIB, EVED_START, EVED_END, USEN_ID, ACCN_ID } = req.body;
  const event = await prisma.event.create({
    data: { EVEC_LIB, EVED_START, EVED_END, USEN_ID, ACCN_ID },
  });
  res.json(event);
};

export const updateEvent = async (req: Request, res: Response) => {
  const event = await prisma.event.update({
    where: { EVEN_ID: parseInt(req.params.id) },
    data: req.body,
  });
  res.json(event);
};

export const deleteEvent = async (req: Request, res: Response) => {
  await prisma.event.delete({
    where: { EVEN_ID: parseInt(req.params.id) },
  });
  res.json({ message: 'Événement supprimé.' });
};
