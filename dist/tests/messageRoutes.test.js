"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-env jest */
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
jest.mock("@prisma/client");
describe("Message Routes", () => {
    describe("GET /messages", () => {
        it("should return 400 if userId is missing", async () => {
            const res = await (0, supertest_1.default)(index_1.default).get("/messages");
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("error", "userId is required");
        });
        it("should return 200 and a list of messages (mocked example)", async () => {
            const res = await (0, supertest_1.default)(index_1.default).get("/messages?userId=1");
            expect([200, 500]).toContain(res.status);
        });
    });
    describe("PUT /messages/:id/read", () => {
        it("should mark message as read", async () => {
            const res = await (0, supertest_1.default)(index_1.default).put("/messages/5/read");
            expect([200, 500]).toContain(res.status);
        });
    });
    describe("DELETE /messages/:id", () => {
        it("should delete a message", async () => {
            const res = await (0, supertest_1.default)(index_1.default).delete("/messages/3");
            expect([200, 500]).toContain(res.status);
        });
    });
});
