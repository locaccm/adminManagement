import { Request, Response } from "express";
import prisma from "../lib/prisma";

/**
 * Get all events related to a user.
 * - If the user is an OWNER, fetches events they created.
 * - If the user is a TENANT, fetches events linked to their currently rented accommodation.
 */
export const getEvents = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.query.userId as string);
  if (!userId) {
    res.status(400).json({ error: "userId is required" });
    return;
  }

  try {
    // Get the user type
    const user = await prisma.user.findUnique({
      where: { USEN_ID: userId },
      select: { USEC_TYPE: true },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // If OWNER: return their own events
    if (user.USEC_TYPE === "OWNER") {
      const events = await prisma.event.findMany({
        where: { USEN_ID: userId },
      });
      res.json(events);
      return;
    }

    // If TENANT: fetch events linked to the accommodation from their active lease
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
    res.status(500).json({ error: "Server error while retrieving events" });
  }
};

/**
 * Get a single event by its ID.
 */
export const getEventById = async (req: Request, res: Response) => {
  const event = await prisma.event.findUnique({
    where: { EVEN_ID: parseInt(req.params.id) },
  });
  res.json(event);
};

/**
 * Create a new event.
 * Expects event data in the request body.
 */
export const createEvent = async (req: Request, res: Response) => {
  const { EVEC_LIB, EVED_START, EVED_END, USEN_ID, ACCN_ID } = req.body;
  const event = await prisma.event.create({
    data: { EVEC_LIB, EVED_START, EVED_END, USEN_ID, ACCN_ID },
  });
  res.json(event);
};

/**
 * Update an existing event by ID.
 * Expects updated data in the request body.
 */
export const updateEvent = async (req: Request, res: Response) => {
  const event = await prisma.event.update({
    where: { EVEN_ID: parseInt(req.params.id) },
    data: req.body,
  });
  res.json(event);
};

/**
 * Delete an event by ID.
 */
export const deleteEvent = async (req: Request, res: Response) => {
  await prisma.event.delete({
    where: { EVEN_ID: parseInt(req.params.id) },
  });
  res.json({ message: "Event deleted successfully." });
};
