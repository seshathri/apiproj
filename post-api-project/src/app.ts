import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import deviceRoutes from './routes/deviceRoutes';
import monitoringRoutes from './routes/monitoringRoutes';
import alertRoutes from './routes/alertRoutes';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/api-project';

// Middleware
app.use(bodyParser.json());

// Middleware to convert binary data to JSON
app.use((req, res, next) => {
  if (req.is('application/octet-stream')) {
    let data = [];
    req.on('data', chunk => data.push(chunk));
    req.on('end', () => {
      try {
        req.body = JSON.parse(Buffer.concat(data).toString());
        next();
      } catch (err) {
        res.status(400).send({ error: 'Invalid binary JSON format' });
      }
    });
  } else {
    next();
  }
});

// Routes
app.use('/api/devices', deviceRoutes);
app.use('/api/monitoring', monitoringRoutes);
app.use('/api/alerts', alertRoutes);

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;