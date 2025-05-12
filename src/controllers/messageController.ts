import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getMessages = async (req: Request, res: Response) => {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'userId requis' });
  
    try {
      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { MESN_SENDER: parseInt(userId as string) },
            { MESN_RECEIVER: parseInt(userId as string) },
          ],
        },
        include: {
          receiver: {  
            select: {
              USEC_FNAME: true,
              USEC_LNAME: true
            }
          }
        },
        orderBy: { MESD_DATE: 'desc' }
      });
  
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  };
  

export const markAsRead = async (req: Request, res: Response): Promise<void> => {
  const message = await prisma.message.update({
    where: { MESN_ID: parseInt(req.params.id) },
    data: { MESB_NEW: false },
  });
  res.json(message);
};

export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
  await prisma.message.delete({ where: { MESN_ID: parseInt(req.params.id) } });
  res.json({ message: 'Message supprimé.' });
};
