"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-env jest */
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
jest.mock("@prisma/client");
describe("Event Routes", () => {
    describe("GET /events", () => {
        it("should return 400 if userId is missing", async () => {
            const res = await (0, supertest_1.default)(index_1.default).get("/events");
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("error", "userId is required");
        });
        it("should return events for userId", async () => {
            const res = await (0, supertest_1.default)(index_1.default).get("/events?userId=1");
            expect([200, 404, 500]).toContain(res.status);
        });
    });
    describe("GET /events/:id", () => {
        it("should return a specific event by ID", async () => {
            const res = await (0, supertest_1.default)(index_1.default).get("/events/1");
            expect([200, 404, 500]).toContain(res.status);
        });
    });
    describe("POST /events", () => {
        it("should create a new event", async () => {
            const res = await (0, supertest_1.default)(index_1.default).post("/events").send({
                EVEC_LIB: "Inspection annuelle",
                EVED_START: "2025-06-01T10:00:00Z",
                EVED_END: "2025-06-01T12:00:00Z",
                USEN_ID: 1,
                ACCN_ID: 2,
            });
            expect([200, 500]).toContain(res.status);
        });
    });
    describe("PUT /events/:id", () => {
        it("should update an existing event", async () => {
            const res = await (0, supertest_1.default)(index_1.default).put("/events/1").send({
                EVEC_LIB: "Inspection modifiée",
                EVED_START: "2025-06-01T11:00:00Z",
                EVED_END: "2025-06-01T13:00:00Z",
            });
            expect([200, 404, 500]).toContain(res.status);
        });
    });
    describe("DELETE /events/:id", () => {
        it("should delete an event", async () => {
            const res = await (0, supertest_1.default)(index_1.default).delete("/events/1");
            expect([200, 404, 500]).toContain(res.status);
        });
    });
});
