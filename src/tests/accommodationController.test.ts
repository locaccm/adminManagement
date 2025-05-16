/* eslint-env jest */
import { Request, Response } from "express";
import * as accommodationController from "../controllers/accommodationController";
import prisma from "../lib/prisma";
jest.mock("../lib/prisma");

describe("accommodationController", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getAccommodations - success", async () => {
    const req = { query: { userId: "1" } } as unknown as Request;
    (prisma.accommodation.findMany as jest.Mock).mockResolvedValue([
      { ACCN_ID: 1 },
    ]);

    await accommodationController.getAccommodations(req, res);
    expect(prisma.accommodation.findMany).toHaveBeenCalledWith({
      where: { USEN_ID: 1 },
    });
    expect(res.json).toHaveBeenCalledWith([{ ACCN_ID: 1 }]);
  });

  test("getAccommodations - missing userId", async () => {
    const req = { query: {} } as unknown as Request;

    await accommodationController.getAccommodations(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "userId is required" });
  });

  test("createAccommodation - success", async () => {
    const req = {
      body: {
        ACCC_NAME: "Studio",
        ACCC_TYPE: "Appartement",
        ACCC_ADDRESS: "1 rue exemple",
        ACCC_DESC: "Joli studio lumineux",
        USEN_ID: 1,
      },
    } as unknown as Request;

    const fakeAccommodation = { ACCN_ID: 10, ...req.body };
    (prisma.accommodation.create as jest.Mock).mockResolvedValue(
      fakeAccommodation,
    );

    await accommodationController.createAccommodation(req, res);
    expect(prisma.accommodation.create).toHaveBeenCalledWith({
      data: req.body,
    });
    expect(res.json).toHaveBeenCalledWith(fakeAccommodation);
  });

  test("updateAccommodation - success", async () => {
    const req = {
      params: { id: "5" },
      body: { ACCC_NAME: "Nouveau nom" },
    } as unknown as Request;

    const updated = { ACCN_ID: 5, ACCC_NAME: "Nouveau nom" };
    (prisma.accommodation.update as jest.Mock).mockResolvedValue(updated);

    await accommodationController.updateAccommodation(req, res);
    expect(prisma.accommodation.update).toHaveBeenCalledWith({
      where: { ACCN_ID: 5 },
      data: req.body,
    });
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  test("deleteAccommodation - success", async () => {
    const req = { params: { id: "3" } } as unknown as Request;

    await accommodationController.deleteAccommodation(req, res);
    expect(prisma.accommodation.delete).toHaveBeenCalledWith({
      where: { ACCN_ID: 3 },
    });
    expect(res.json).toHaveBeenCalledWith({
      message: "Accommodation deleted successfully.",
    });
  });
});
