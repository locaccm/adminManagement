import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import userRoutes from "./routes/userRoutes";
import eventRoutes from "./routes/eventRoutes";
import messageRoutes from "./routes/messageRoutes";
import accommodationRoutes from "./routes/accommodationRoutes";
import leaseRoutes from "./routes/leaseRoutes";
import { setupSwagger } from "./api_documentation/swagger";

dotenv.config();

const app = express();

// --- CORS configuration ---
const allowedOrigins: string[] =
  process.env.NODE_ENV === "development"
    ? ["http://localhost:5173"]
    : ["https://yourdomain.com"];

const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
// --- End CORS configuration ---

setupSwagger(app);
app.use(express.json());

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
