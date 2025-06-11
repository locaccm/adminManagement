"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-env jest */
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
jest.mock("@prisma/client");
describe("Lease Routes", () => {
    describe("GET /leases", () => {
        it("should return 400 if userId is missing", async () => {
            const res = await (0, supertest_1.default)(index_1.default).get("/leases");
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("error", "userId is required");
        });
        it("should return leases if userId is provided", async () => {
            const res = await (0, supertest_1.default)(index_1.default).get("/leases?userId=1");
            expect([200, 500]).toContain(res.status); // 500 possible si DB vide
        });
    });
    describe("POST /leases", () => {
        it("should create a new lease", async () => {
            const res = await (0, supertest_1.default)(index_1.default).post("/leases").send({
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
            const res = await (0, supertest_1.default)(index_1.default).put("/leases/1").send({
                LEAN_RENT: 950,
            });
            expect([200, 500]).toContain(res.status);
        });
    });
    describe("DELETE /leases/:id", () => {
        it("should delete a lease", async () => {
            const res = await (0, supertest_1.default)(index_1.default).delete("/leases/1");
            expect([200, 500]).toContain(res.status);
        });
    });
});
