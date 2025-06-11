"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaseController = __importStar(require("../controllers/leaseController"));
const prisma_1 = __importDefault(require("../lib/prisma"));
jest.mock("@prisma/client");
describe("LeaseController", () => {
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    afterEach(() => {
        jest.clearAllMocks();
    });
    test("getLeases returns leases for a user", async () => {
        const req = { query: { userId: "1" } };
        prisma_1.default.lease.findMany.mockResolvedValue([
            { LEAN_ID: 1, LEAN_RENT: 500 },
        ]);
        await leaseController.getLeases(req, res);
        expect(prisma_1.default.lease.findMany).toHaveBeenCalledWith({
            where: { USEN_ID: 1 },
        });
        expect(res.json).toHaveBeenCalledWith([{ LEAN_ID: 1, LEAN_RENT: 500 }]);
    });
    test("getLeases without userId returns 400", async () => {
        const req = { query: {} };
        await leaseController.getLeases(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "userId is required" });
    });
    test("createLease creates a lease", async () => {
        const req = { body: { LEAN_RENT: 700 } };
        prisma_1.default.lease.create.mockResolvedValue({
            LEAN_ID: 1,
            LEAN_RENT: 700,
        });
        await leaseController.createLease(req, res);
        expect(prisma_1.default.lease.create).toHaveBeenCalledWith({
            data: { LEAN_RENT: 700 },
        });
        expect(res.json).toHaveBeenCalledWith({ LEAN_ID: 1, LEAN_RENT: 700 });
    });
    test("updateLease updates a lease", async () => {
        const req = {
            params: { id: "2" },
            body: { LEAN_RENT: 800 },
        };
        prisma_1.default.lease.update.mockResolvedValue({
            LEAN_ID: 2,
            LEAN_RENT: 800,
        });
        await leaseController.updateLease(req, res);
        expect(prisma_1.default.lease.update).toHaveBeenCalledWith({
            where: { LEAN_ID: 2 },
            data: { LEAN_RENT: 800 },
        });
        expect(res.json).toHaveBeenCalledWith({ LEAN_ID: 2, LEAN_RENT: 800 });
    });
    test("deleteLease deletes a lease", async () => {
        const req = { params: { id: "3" } };
        prisma_1.default.lease.delete.mockResolvedValue(undefined);
        await leaseController.deleteLease(req, res);
        expect(prisma_1.default.lease.delete).toHaveBeenCalledWith({
            where: { LEAN_ID: 3 },
        });
        expect(res.json).toHaveBeenCalledWith({ message: "Lease deleted." });
    });
});
