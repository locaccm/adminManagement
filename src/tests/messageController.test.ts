import { Request, Response } from "express";
import * as messageController from "../controllers/messageController";
import prisma from "../lib/prisma";

jest.mock("../lib/prisma", () => ({
  message: {
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("MessageController", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getMessages retourne les messages", async () => {
    const req = { query: { userId: "1" } } as unknown as Request;

    (prisma.message.findMany as jest.Mock).mockResolvedValue([
      { MESN_ID: 1, MESC_CONTENT: "Hello" },
    ]);

    await messageController.getMessages(req, res);

    expect(prisma.message.findMany).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith([
      { MESN_ID: 1, MESC_CONTENT: "Hello" },
    ]);
  });

  test("getMessages sans userId retourne une erreur 400", async () => {
    const req = { query: {} } as unknown as Request;
    await messageController.getMessages(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "userId requis" });
  });

  test("markAsRead met un message comme lu", async () => {
    const req = { params: { id: "5" } } as unknown as Request;

    (prisma.message.update as jest.Mock).mockResolvedValue({
      MESN_ID: 5,
      MESB_NEW: false,
    });

    await messageController.markAsRead(req, res);

    expect(prisma.message.update).toHaveBeenCalledWith({
      where: { MESN_ID: 5 },
      data: { MESB_NEW: false },
    });
    expect(res.json).toHaveBeenCalledWith({ MESN_ID: 5, MESB_NEW: false });
  });

  test("deleteMessage supprime un message", async () => {
    const req = { params: { id: "3" } } as unknown as Request;

    (prisma.message.delete as jest.Mock).mockResolvedValue(undefined);

    await messageController.deleteMessage(req, res);

    expect(prisma.message.delete).toHaveBeenCalledWith({
      where: { MESN_ID: 3 },
    });
    expect(res.json).toHaveBeenCalledWith({ message: "Message supprimé." });
  });
});
