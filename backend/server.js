const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tickethub';
// Ensure database name is specified in the connection string
const connectionString = MONGO_URI.endsWith('/') ? `${MONGO_URI}tickethub` : MONGO_URI;
console.log('Connecting to MongoDB with connection string:', connectionString);
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.error('Please make sure MongoDB is installed and running on your machine');
  });


app.use('/api/auth', require('./routes/auth'));
app.use('/api/tickets', require('./routes/tickets'));

app.get('/', (req, res) => {
  res.send('TicketHub API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
