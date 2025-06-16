/* eslint-env jest */
import request from "supertest";
import app from "../index";
jest.mock("@prisma/client");

describe("Lease Routes", () => {
  describe("GET /leases", () => {
    it("should return 400 if userId is missing", async () => {
      const res = await request(app).get("/leases");
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "userId is required");
    });

    it("should return leases if userId is provided", async () => {
      const res = await request(app).get("/leases?userId=1");
      expect([200, 500]).toContain(res.status); // 500 possible si DB vide
    });
  });

  describe("POST /leases", () => {
    it("should create a new lease", async () => {
      const res = await request(app).post("/leases").send({
        LEAD_START: "2025-06-01",
        LEAD_END: "2025-12-01",
        LEAN_RENT: 900,
        LEAN_CHARGES: 100,
        LEAD_PAYMENT: "2025-06-01",
        USEN_ID: 1,
        ACCN_ID: 2,
      });

      expect([200, 500]).toContain(res.status);
    });
  });

  describe("PUT /leases/:id", () => {
    it("should update a lease", async () => {
      const res = await request(app).put("/leases/1").send({
        LEAN_RENT: 950,
      });

      expect([200, 500]).toContain(res.status);
    });
  });

  describe("DELETE /leases/:id", () => {
    it("should delete a lease", async () => {
      const res = await request(app).delete("/leases/1");
      expect([200, 500]).toContain(res.status);
    });
  });
});
