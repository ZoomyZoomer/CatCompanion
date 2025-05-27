const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const adventureRoutes = require('./routes/adventureRoutes.js');
const dailyRoutes = require('./routes/dailyRoutes.js')
const inventoryRoutes = require('./routes/inventoryRoutes.js')
const customerServiceRoutes = require('./routes/customerServiceRoutes.js')

dotenv.config();

const app = express();
// Use CORS middleware — allows requests from other origins
app.use(cors({
  origin: '*'
}));

app.use(express.json());

// Your API routes
app.use('/', adventureRoutes);
app.use('/', dailyRoutes);
app.use('/', inventoryRoutes);
app.use('/', customerServiceRoutes);

// Connect to MongoDB (replace with your real URI)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log('Server running');
});