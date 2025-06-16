import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import eventRoutes from "./routes/eventRoutes";
import messageRoutes from "./routes/messageRoutes";
import accommodationRoutes from "./routes/accommodationRoutes";
import leaseRoutes from "./routes/leaseRoutes";
import { setupSwagger } from "./api_documentation/swagger";

dotenv.config();

const app = express();

// Ajout du middleware CORS (autorise tout)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization,user-id",
    credentials: true,
  }),
);
// Middleware JSON
app.use(express.json());

setupSwagger(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Admin Dashboard API OK!");
});

// Routes
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/messages", messageRoutes);
app.use("/accommodations", accommodationRoutes);
app.use("/leases", leaseRoutes);

export default app;
