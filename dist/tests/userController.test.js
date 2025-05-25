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
const userController = __importStar(require("../controllers/userController"));
const prisma_1 = __importDefault(require("../lib/prisma"));
jest.mock("@prisma/client");
describe("userController", () => {
    const mockRes = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };
    describe("getUsers", () => {
        it("should return filtered list of users", async () => {
            const req = {
                query: {
                    type: "OWNER",
                    nom: "Dupont",
                    prenom: "Jean",
                },
            };
            const res = mockRes();
            const fakeUsers = [
                {
                    USEN_ID: 1,
                    USEC_LNAME: "Dupont",
                    USEC_FNAME: "Jean",
                    USEC_TYPE: "OWNER",
                },
            ];
            prisma_1.default.user.findMany.mockResolvedValue(fakeUsers);
            await userController.getUsers(req, res);
            expect(prisma_1.default.user.findMany).toHaveBeenCalledWith({
                where: {
                    USEC_TYPE: "OWNER",
                    USEC_LNAME: { contains: "Dupont" },
                    USEC_FNAME: { contains: "Jean" },
                },
            });
            expect(res.json).toHaveBeenCalledWith(fakeUsers);
        });
    });
    describe("getUserById", () => {
        it("should return a single user by ID", async () => {
            const req = { params: { id: "3" } };
            const res = mockRes();
            const user = { USEN_ID: 3, USEC_LNAME: "Martin", USEC_FNAME: "Sophie" };
            prisma_1.default.user.findUnique.mockResolvedValue(user);
            await userController.getUserById(req, res);
            expect(prisma_1.default.user.findUnique).toHaveBeenCalledWith({
                where: { USEN_ID: 3 },
            });
            expect(res.json).toHaveBeenCalledWith(user);
        });
    });
    describe("updateUser", () => {
        it("should update a user by ID", async () => {
            const req = {
                params: { id: "5" },
                body: {
                    USEC_LNAME: "Doe",
                    USEC_FNAME: "John",
                    USEC_ADDRESS: "123 rue X",
                    USEC_TEL: "0600000000",
                    USEC_BIO: "Nouveau locataire",
                },
            };
            const res = mockRes();
            const updatedUser = { USEN_ID: 5, ...req.body };
            prisma_1.default.user.update.mockResolvedValue(updatedUser);
            await userController.updateUser(req, res);
            expect(prisma_1.default.user.update).toHaveBeenCalledWith({
                where: { USEN_ID: 5 },
                data: {
                    USEC_LNAME: "Doe",
                    USEC_FNAME: "John",
                    USEC_ADDRESS: "123 rue X",
                    USEC_TEL: "0600000000",
                    USEC_BIO: "Nouveau locataire",
                },
            });
            expect(res.json).toHaveBeenCalledWith(updatedUser);
        });
    });
});
