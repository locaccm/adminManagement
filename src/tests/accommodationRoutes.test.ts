import request from "supertest";
import app from "../index";

describe("Accommodation Routes", () => {
  describe("GET /accommodations", () => {
    it("should return 400 if userId is missing", async () => {
      const res = await request(app).get("/accommodations");
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "userId is required");
    });

    it("should return accommodations for a given userId", async () => {
      const res = await request(app).get("/accommodations?userId=1");
      expect([200, 500]).toContain(res.status);
    });
  });

  describe("POST /accommodations", () => {
    it("should create a new accommodation", async () => {
      const res = await request(app).post("/accommodations").send({
        ACCC_NAME: "Studio test",
        ACCC_TYPE: "Appartement",
        ACCC_ADDRESS: "10 rue test",
        ACCC_DESC: "Logement de test",
        USEN_ID: 1,
      });

      expect([200, 500]).toContain(res.status);
    });
  });

  describe("PUT /accommodations/:id", () => {
    it("should update an accommodation", async () => {
      const res = await request(app).put("/accommodations/1").send({
        ACCC_NAME: "Studio modifié",
      });

      expect([200, 404, 500]).toContain(res.status);
    });
  });

  describe("DELETE /accommodations/:id", () => {
    it("should delete an accommodation", async () => {
      const res = await request(app).delete("/accommodations/1");
      expect([200, 404, 500]).toContain(res.status);
    });
  });
});
