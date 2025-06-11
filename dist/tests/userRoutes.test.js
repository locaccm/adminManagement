"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-env jest */
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const prisma_1 = __importDefault(require("../lib/prisma"));
jest.mock("@prisma/client");
describe("GET /users", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should return a list of users", async () => {
        prisma_1.default.user.findMany.mockResolvedValue([
            {
                USEN_ID: 1,
                USEC_FNAME: "Jean",
                USEC_LNAME: "Dupont",
                USEC_TYPE: "OWNER",
            },
        ]);
        const res = await (0, supertest_1.default)(index_1.default).get("/users");
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
        prisma_1.default.user.findMany.mockResolvedValue([
            {
                USEN_ID: 1,
                USEC_FNAME: "Jean",
                USEC_LNAME: "Dupont",
                USEC_TYPE: "OWNER",
            },
        ]);
        const res = await (0, supertest_1.default)(index_1.default).get("/users?prenom=Jean&nom=Dupont");
        expect(res.status).toBe(200);
        expect(res.body[0].USEC_FNAME).toBe("Jean");
        expect(res.body[0].USEC_LNAME).toBe("Dupont");
    });
});
