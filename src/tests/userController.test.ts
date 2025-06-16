/* eslint-env jest */
import { Request, Response } from "express";
import * as userController from "../controllers/userController";
import prisma from "../lib/prisma";
jest.mock("@prisma/client");

describe("userController", () => {
  const mockRes = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  describe("getUsers", () => {
    it("should return filtered list of users", async () => {
      const req = {
        query: {
          type: "OWNER",
          nom: "Dupont",
          prenom: "Jean",
        },
      } as unknown as Request;

      const res = mockRes();

      const fakeUsers = [
        {
          USEN_ID: 1,
          USEC_LNAME: "Dupont",
          USEC_FNAME: "Jean",
          USEC_TYPE: "OWNER",
        },
      ];
      (prisma.user.findMany as jest.Mock).mockResolvedValue(fakeUsers);

      await userController.getUsers(req, res);

      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: {
          USEC_TYPE: "OWNER",
          USEC_LNAME: { contains: "Dupont" },
          USEC_FNAME: { contains: "Jean" },
        },
      });
      expect(res.json).toHaveBeenCalledWith(fakeUsers);
    });
  });

  describe("getUserById", () => {
    it("should return a single user by ID", async () => {
      const req = { params: { id: "3" } } as unknown as Request;
      const res = mockRes();

      const user = { USEN_ID: 3, USEC_LNAME: "Martin", USEC_FNAME: "Sophie" };
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);

      await userController.getUserById(req, res);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { USEN_ID: 3 },
      });
      expect(res.json).toHaveBeenCalledWith(user);
    });
  });

  describe("updateUser", () => {
    it("should update a user by ID", async () => {
      const req = {
        params: { id: "5" },
        body: {
          USEC_LNAME: "Doe",
          USEC_FNAME: "John",
          USEC_ADDRESS: "123 rue X",
          USEC_TEL: "0600000000",
          USEC_BIO: "Nouveau locataire",
        },
      } as unknown as Request;

      const res = mockRes();

      const updatedUser = { USEN_ID: 5, ...req.body };
      (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

      await userController.updateUser(req, res);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { USEN_ID: 5 },
        data: {
          USEC_LNAME: "Doe",
          USEC_FNAME: "John",
          USEC_ADDRESS: "123 rue X",
          USEC_TEL: "0600000000",
          USEC_BIO: "Nouveau locataire",
        },
      });

      expect(res.json).toHaveBeenCalledWith(updatedUser);
    });
  });
});
