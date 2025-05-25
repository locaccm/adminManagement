"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Admin Management API",
            version: "1.0.0",
            description: "API documentation for the admin dashboard",
        },
    },
    apis: ["./src/routes/*.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const setupSwagger = (app) => {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    const docDir = path_1.default.join(__dirname, "..", "api_documentation");
    if (!fs_1.default.existsSync(docDir)) {
        fs_1.default.mkdirSync(docDir);
    }
    fs_1.default.writeFileSync(path_1.default.join(docDir, "swagger_doc.json"), JSON.stringify(swaggerSpec, null, 2));
};
exports.setupSwagger = setupSwagger;
