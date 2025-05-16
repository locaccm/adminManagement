import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import eventRoutes from "./routes/eventRoutes";
import messageRoutes from "./routes/messageRoutes";
import accommodationRoutes from "./routes/accommodationRoutes";
import leaseRoutes from "./routes/leaseRoutes";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();
setupSwagger(app);
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Admin Dashboard API OK!");
});

// Routes
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/messages", messageRoutes);
app.use("/accommodations", accommodationRoutes);
app.use("/leases", leaseRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`),
);
