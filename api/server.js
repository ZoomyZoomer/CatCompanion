const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const adventureRoutes = require('./routes/adventureRoutes.js');
const dailyRoutes = require('./routes/dailyRoutes.js')
const inventoryRoutes = require('./routes/inventoryRoutes.js')
const customerServiceRoutes = require('./routes/customerServiceRoutes.js')
const habitRoutes = require('./routes/habitRoutes.js')

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
app.use('/', habitRoutes);

// Connect to MongoDB (replace with your real URI)
mongoose.connect('mongodb+srv://kamilcwisniewski:freexqcOW12345@cluster0.2lesege.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
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