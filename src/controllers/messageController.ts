import { Request, Response } from "express";
import prisma from "../lib/prisma";

/**
 * Get all messages related to a user (as sender or receiver).
 * Filters based on `userId` passed in query parameters.
 * Includes receiver's first and last name.
 */
export const getMessages = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userId } = req.query;
  if (!userId) {
    res.status(400).json({ error: "userId is required" });
    return;
  }

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
            USEC_LNAME: true,
          },
        },
      },
      orderBy: { MESD_DATE: "desc" },
    });

    res.json(messages);
  } catch {
    res.status(500).json({ error: "Server error while fetching messages" });
  }
};

/**
 * Mark a message as read by updating `MESB_NEW` to false.
 */
export const markAsRead = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const message = await prisma.message.update({
    where: { MESN_ID: parseInt(req.params.id) },
    data: { MESB_NEW: false },
  });
  res.json(message);
};

/**
 * Delete a message by its ID.
 */
export const deleteMessage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  await prisma.message.delete({
    where: { MESN_ID: parseInt(req.params.id) },
  });
  res.json({ message: "Message deleted." });
};
