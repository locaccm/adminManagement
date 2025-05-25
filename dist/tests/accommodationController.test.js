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
const accommodationController = __importStar(require("../controllers/accommodationController"));
const prisma_1 = __importDefault(require("../lib/prisma"));
jest.mock("@prisma/client");
describe("accommodationController", () => {
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    afterEach(() => {
        jest.clearAllMocks();
    });
    test("getAccommodations - success", async () => {
        const req = { query: { userId: "1" } };
        prisma_1.default.accommodation.findMany.mockResolvedValue([
            { ACCN_ID: 1 },
        ]);
        await accommodationController.getAccommodations(req, res);
        expect(prisma_1.default.accommodation.findMany).toHaveBeenCalledWith({
            where: { USEN_ID: 1 },
        });
        expect(res.json).toHaveBeenCalledWith([{ ACCN_ID: 1 }]);
    });
    test("getAccommodations - missing userId", async () => {
        const req = { query: {} };
        await accommodationController.getAccommodations(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "userId is required" });
    });
    test("createAccommodation - success", async () => {
        const req = {
            body: {
                ACCC_NAME: "Studio",
                ACCC_TYPE: "Appartement",
                ACCC_ADDRESS: "1 rue exemple",
                ACCC_DESC: "Joli studio lumineux",
                USEN_ID: 1,
            },
        };
        const fakeAccommodation = { ACCN_ID: 10, ...req.body };
        prisma_1.default.accommodation.create.mockResolvedValue(fakeAccommodation);
        await accommodationController.createAccommodation(req, res);
        expect(prisma_1.default.accommodation.create).toHaveBeenCalledWith({
            data: req.body,
        });
        expect(res.json).toHaveBeenCalledWith(fakeAccommodation);
    });
    test("updateAccommodation - success", async () => {
        const req = {
            params: { id: "5" },
            body: { ACCC_NAME: "Nouveau nom" },
        };
        const updated = { ACCN_ID: 5, ACCC_NAME: "Nouveau nom" };
        prisma_1.default.accommodation.update.mockResolvedValue(updated);
        await accommodationController.updateAccommodation(req, res);
        expect(prisma_1.default.accommodation.update).toHaveBeenCalledWith({
            where: { ACCN_ID: 5 },
            data: req.body,
        });
        expect(res.json).toHaveBeenCalledWith(updated);
    });
    test("deleteAccommodation - success", async () => {
        const req = { params: { id: "3" } };
        await accommodationController.deleteAccommodation(req, res);
        expect(prisma_1.default.accommodation.delete).toHaveBeenCalledWith({
            where: { ACCN_ID: 3 },
        });
        expect(res.json).toHaveBeenCalledWith({
            message: "Accommodation deleted successfully.",
        });
    });
});
