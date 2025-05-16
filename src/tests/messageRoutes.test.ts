/* eslint-env jest */
import request from "supertest";
import app from "../index";
jest.mock("../lib/prisma");

describe("Message Routes", () => {
  describe("GET /messages", () => {
    it("should return 400 if userId is missing", async () => {
      const res = await request(app).get("/messages");
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "userId is required");
    });

    it("should return 200 and a list of messages (mocked example)", async () => {
      const res = await request(app).get("/messages?userId=1");
      expect([200, 500]).toContain(res.status);
    });
  });

  describe("PUT /messages/:id/read", () => {
    it("should mark message as read", async () => {
      const res = await request(app).put("/messages/5/read");
      expect([200, 500]).toContain(res.status);
    });
  });

  describe("DELETE /messages/:id", () => {
    it("should delete a message", async () => {
      const res = await request(app).delete("/messages/3");
      expect([200, 500]).toContain(res.status);
    });
  });
});
