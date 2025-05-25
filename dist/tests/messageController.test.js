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
const messageController = __importStar(require("../controllers/messageController"));
const prisma_1 = __importDefault(require("../lib/prisma"));
jest.mock("@prisma/client");
describe("MessageController", () => {
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    afterEach(() => {
        jest.clearAllMocks();
    });
    test("getMessages returns messages", async () => {
        const req = { query: { userId: "1" } };
        prisma_1.default.message.findMany.mockResolvedValue([
            { MESN_ID: 1, MESC_CONTENT: "Hello" },
        ]);
        await messageController.getMessages(req, res);
        expect(prisma_1.default.message.findMany).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith([
            { MESN_ID: 1, MESC_CONTENT: "Hello" },
        ]);
    });
    test("getMessages without userId returns 400", async () => {
        const req = { query: {} };
        await messageController.getMessages(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "userId is required" });
    });
    test("markAsRead marks a message as read", async () => {
        const req = { params: { id: "5" } };
        prisma_1.default.message.update.mockResolvedValue({
            MESN_ID: 5,
            MESB_NEW: false,
        });
        await messageController.markAsRead(req, res);
        expect(prisma_1.default.message.update).toHaveBeenCalledWith({
            where: { MESN_ID: 5 },
            data: { MESB_NEW: false },
        });
        expect(res.json).toHaveBeenCalledWith({ MESN_ID: 5, MESB_NEW: false });
    });
    test("deleteMessage deletes a message", async () => {
        const req = { params: { id: "3" } };
        prisma_1.default.message.delete.mockResolvedValue(undefined);
        await messageController.deleteMessage(req, res);
        expect(prisma_1.default.message.delete).toHaveBeenCalledWith({
            where: { MESN_ID: 3 },
        });
        expect(res.json).toHaveBeenCalledWith({ message: "Message deleted." });
    });
});
