/* eslint-env jest */
import request from "supertest";
import app from "../index";
import prisma from "../lib/prisma";
jest.mock("../lib/prisma");

describe("GET /users", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of users", async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue([
      {
        USEN_ID: 1,
        USEC_FNAME: "Jean",
        USEC_LNAME: "Dupont",
        USEC_TYPE: "OWNER",
      },
    ]);

    const res = await request(app).get("/users");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        USEN_ID: 1,
        USEC_FNAME: "Jean",
        USEC_LNAME: "Dupont",
        USEC_TYPE: "OWNER",
      },
    ]);
  });

  it("should filter by first name and last name", async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue([
      {
        USEN_ID: 1,
        USEC_FNAME: "Jean",
        USEC_LNAME: "Dupont",
        USEC_TYPE: "OWNER",
      },
    ]);

    const res = await request(app).get("/users?prenom=Jean&nom=Dupont");

    expect(res.status).toBe(200);
    expect(res.body[0].USEC_FNAME).toBe("Jean");
    expect(res.body[0].USEC_LNAME).toBe("Dupont");
  });
});
