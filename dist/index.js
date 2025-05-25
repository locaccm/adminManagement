"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const accommodationRoutes_1 = __importDefault(require("./routes/accommodationRoutes"));
const leaseRoutes_1 = __importDefault(require("./routes/leaseRoutes"));
const swagger_1 = require("./api_documentation/swagger");
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, swagger_1.setupSwagger)(app);
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Admin Dashboard API OK!");
});
// Routes
app.use("/users", userRoutes_1.default);
app.use("/events", eventRoutes_1.default);
app.use("/messages", messageRoutes_1.default);
app.use("/accommodations", accommodationRoutes_1.default);
app.use("/leases", leaseRoutes_1.default);
exports.default = app;
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Serveur lancé sur http://localhost:${PORT}`));
