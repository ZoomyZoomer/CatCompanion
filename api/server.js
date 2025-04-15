import express from 'express';
import adventureRoutes from './routes/adventureRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Mount your route modules here
app.use('/api/adventure', adventureRoutes);
// app.use('/api/calendar', calendarRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
