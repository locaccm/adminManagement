/* eslint-env jest */
import { Request, Response } from "express";
import * as eventController from "../controllers/eventController";
import prisma from "../lib/prisma";
jest.mock("@prisma/client");

describe("eventController", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getEvents (owner)", async () => {
    const req = { query: { userId: "1" } } as unknown as Request;

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      USEC_TYPE: "OWNER",
    });
    (prisma.event.findMany as jest.Mock).mockResolvedValue([{ EVEN_ID: 1 }]);

    await eventController.getEvents(req, res);

    expect(prisma.event.findMany).toHaveBeenCalledWith({
      where: { USEN_ID: 1 },
    });
    expect(res.json).toHaveBeenCalledWith([{ EVEN_ID: 1 }]);
  });

  test("getEvents (tenant)", async () => {
    const req = { query: { userId: "2" } } as unknown as Request;

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      USEC_TYPE: "TENANT",
    });
    (prisma.lease.findFirst as jest.Mock).mockResolvedValue({ ACCN_ID: 100 });
    (prisma.event.findMany as jest.Mock).mockResolvedValue([{ EVEN_ID: 5 }]);

    await eventController.getEvents(req, res);

    expect(prisma.event.findMany).toHaveBeenCalledWith({
      where: { ACCN_ID: 100 },
    });
    expect(res.json).toHaveBeenCalledWith([{ EVEN_ID: 5 }]);
  });

  test("getEvents with missing userId returns 400", async () => {
    const req = { query: {} } as unknown as Request;
    await eventController.getEvents(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "userId is required" });
  });

  test("getEventById", async () => {
    const req = { params: { id: "1" } } as unknown as Request;
    (prisma.event.findUnique as jest.Mock).mockResolvedValue({ EVEN_ID: 1 });

    await eventController.getEventById(req, res);

    expect(prisma.event.findUnique).toHaveBeenCalledWith({
      where: { EVEN_ID: 1 },
    });
    expect(res.json).toHaveBeenCalledWith({ EVEN_ID: 1 });
  });

  test("createEvent", async () => {
    const req = {
      body: {
        EVEC_LIB: "Meeting",
        EVED_START: "2025-05-14T10:00:00Z",
        EVED_END: "2025-05-14T12:00:00Z",
        USEN_ID: 1,
        ACCN_ID: 10,
      },
    } as unknown as Request;

    const fakeEvent = { EVEN_ID: 42 };
    (prisma.event.create as jest.Mock).mockResolvedValue(fakeEvent);

    await eventController.createEvent(req, res);
    expect(prisma.event.create).toHaveBeenCalledWith({ data: req.body });
    expect(res.json).toHaveBeenCalledWith(fakeEvent);
  });

  test("updateEvent", async () => {
    const req = {
      params: { id: "1" },
      body: { EVEC_LIB: "Updated" },
    } as unknown as Request;

    (prisma.event.update as jest.Mock).mockResolvedValue({ EVEN_ID: 1 });

    await eventController.updateEvent(req, res);
    expect(prisma.event.update).toHaveBeenCalledWith({
      where: { EVEN_ID: 1 },
      data: req.body,
    });
    expect(res.json).toHaveBeenCalledWith({ EVEN_ID: 1 });
  });

  test("deleteEvent", async () => {
    const req = { params: { id: "3" } } as unknown as Request;

    (prisma.event.delete as jest.Mock).mockResolvedValue(undefined);

    await eventController.deleteEvent(req, res);

    expect(prisma.event.delete).toHaveBeenCalledWith({
      where: { EVEN_ID: 3 },
    });
    expect(res.json).toHaveBeenCalledWith({
      message: "Event deleted successfully.",
    });
  });
});
