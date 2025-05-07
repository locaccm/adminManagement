import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors()); 
// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Admin Dashboard API OK!');
});

// Routes utilisateurs
app.use('/users', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Serveur lancé sur http://localhost:${PORT}`));
