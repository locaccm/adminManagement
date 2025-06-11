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
const eventController = __importStar(require("../controllers/eventController"));
const prisma_1 = __importDefault(require("../lib/prisma"));
jest.mock("@prisma/client");
describe("eventController", () => {
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    afterEach(() => {
        jest.clearAllMocks();
    });
    test("getEvents (owner)", async () => {
        const req = { query: { userId: "1" } };
        prisma_1.default.user.findUnique.mockResolvedValue({
            USEC_TYPE: "OWNER",
        });
        prisma_1.default.event.findMany.mockResolvedValue([{ EVEN_ID: 1 }]);
        await eventController.getEvents(req, res);
        expect(prisma_1.default.event.findMany).toHaveBeenCalledWith({
            where: { USEN_ID: 1 },
        });
        expect(res.json).toHaveBeenCalledWith([{ EVEN_ID: 1 }]);
    });
    test("getEvents (tenant)", async () => {
        const req = { query: { userId: "2" } };
        prisma_1.default.user.findUnique.mockResolvedValue({
            USEC_TYPE: "TENANT",
        });
        prisma_1.default.lease.findFirst.mockResolvedValue({ ACCN_ID: 100 });
        prisma_1.default.event.findMany.mockResolvedValue([{ EVEN_ID: 5 }]);
        await eventController.getEvents(req, res);
        expect(prisma_1.default.event.findMany).toHaveBeenCalledWith({
            where: { ACCN_ID: 100 },
        });
        expect(res.json).toHaveBeenCalledWith([{ EVEN_ID: 5 }]);
    });
    test("getEvents with missing userId returns 400", async () => {
        const req = { query: {} };
        await eventController.getEvents(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "userId is required" });
    });
    test("getEventById", async () => {
        const req = { params: { id: "1" } };
        prisma_1.default.event.findUnique.mockResolvedValue({ EVEN_ID: 1 });
        await eventController.getEventById(req, res);
        expect(prisma_1.default.event.findUnique).toHaveBeenCalledWith({
            where: { EVEN_ID: 1 },
        });
        expect(res.json).toHaveBeenCalledWith({ EVEN_ID: 1 });
    });
    test("createEvent", async () => {
        const req = {
            body: {
                EVEC_LIB: "Meeting",
                EVED_START: "2025-05-14T10:00:00Z",
                EVED_END: "2025-05-14T12:00:00Z",
                USEN_ID: 1,
                ACCN_ID: 10,
            },
        };
        const fakeEvent = { EVEN_ID: 42 };
        prisma_1.default.event.create.mockResolvedValue(fakeEvent);
        await eventController.createEvent(req, res);
        expect(prisma_1.default.event.create).toHaveBeenCalledWith({ data: req.body });
        expect(res.json).toHaveBeenCalledWith(fakeEvent);
    });
    test("updateEvent", async () => {
        const req = {
            params: { id: "1" },
            body: { EVEC_LIB: "Updated" },
        };
        prisma_1.default.event.update.mockResolvedValue({ EVEN_ID: 1 });
        await eventController.updateEvent(req, res);
        expect(prisma_1.default.event.update).toHaveBeenCalledWith({
            where: { EVEN_ID: 1 },
            data: req.body,
        });
        expect(res.json).toHaveBeenCalledWith({ EVEN_ID: 1 });
    });
    test("deleteEvent", async () => {
        const req = { params: { id: "3" } };
        prisma_1.default.event.delete.mockResolvedValue(undefined);
        await eventController.deleteEvent(req, res);
        expect(prisma_1.default.event.delete).toHaveBeenCalledWith({
            where: { EVEN_ID: 3 },
        });
        expect(res.json).toHaveBeenCalledWith({
            message: "Event deleted successfully.",
        });
    });
});
