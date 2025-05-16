/* eslint-env jest */
import { Request, Response } from "express";
import * as leaseController from "../controllers/leaseController";
import prisma from "../lib/prisma";

jest.mock("../lib/prisma", () => ({
  lease: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("LeaseController", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getLeases returns leases for a user", async () => {
    const req = { query: { userId: "1" } } as unknown as Request;

    (prisma.lease.findMany as jest.Mock).mockResolvedValue([
      { LEAN_ID: 1, LEAN_RENT: 500 },
    ]);

    await leaseController.getLeases(req, res);

    expect(prisma.lease.findMany).toHaveBeenCalledWith({
      where: { USEN_ID: 1 },
    });
    expect(res.json).toHaveBeenCalledWith([{ LEAN_ID: 1, LEAN_RENT: 500 }]);
  });

  test("getLeases without userId returns 400", async () => {
    const req = { query: {} } as unknown as Request;
    await leaseController.getLeases(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "userId is required" });
  });

  test("createLease creates a lease", async () => {
    const req = { body: { LEAN_RENT: 700 } } as unknown as Request;

    (prisma.lease.create as jest.Mock).mockResolvedValue({
      LEAN_ID: 1,
      LEAN_RENT: 700,
    });

    await leaseController.createLease(req, res);

    expect(prisma.lease.create).toHaveBeenCalledWith({
      data: { LEAN_RENT: 700 },
    });
    expect(res.json).toHaveBeenCalledWith({ LEAN_ID: 1, LEAN_RENT: 700 });
  });

  test("updateLease updates a lease", async () => {
    const req = {
      params: { id: "2" },
      body: { LEAN_RENT: 800 },
    } as unknown as Request;

    (prisma.lease.update as jest.Mock).mockResolvedValue({
      LEAN_ID: 2,
      LEAN_RENT: 800,
    });

    await leaseController.updateLease(req, res);

    expect(prisma.lease.update).toHaveBeenCalledWith({
      where: { LEAN_ID: 2 },
      data: { LEAN_RENT: 800 },
    });
    expect(res.json).toHaveBeenCalledWith({ LEAN_ID: 2, LEAN_RENT: 800 });
  });

  test("deleteLease deletes a lease", async () => {
    const req = { params: { id: "3" } } as unknown as Request;

    (prisma.lease.delete as jest.Mock).mockResolvedValue(undefined);

    await leaseController.deleteLease(req, res);

    expect(prisma.lease.delete).toHaveBeenCalledWith({
      where: { LEAN_ID: 3 },
    });
    expect(res.json).toHaveBeenCalledWith({ message: "Lease deleted." });
  });
});
