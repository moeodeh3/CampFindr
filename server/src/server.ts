import express from 'express';
import cron from 'node-cron';
import cors from 'cors';
import { fetchMapLegend } from './service/mapLegend/mapLegend.js';
import { fetchResourceLocations } from './service/resource/resourceLegend.js';
import resourceRouter from './routes/resource.js';
import availabilityRouter from './routes/availability.js';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 4000;

// load environment variables
dotenv.config();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// health check route
app.get('/', (req, res) => {
  res.send('Server is running :)');
});

async function refreshCaches() {
  try {
    // fetch and cache map legend and resource locations
    await fetchMapLegend();
    await fetchResourceLocations();
  } catch (error) {
    console.error('Failed to refresh caches:', error);
  }
}

// run cache refresh on server startup
refreshCaches();

// scheduler that runs every Sunday at midnight
cron.schedule('0 0 * * 0', refreshCaches);

// routers
app.use('/api/resource', resourceRouter);
app.use('/api/availability', availabilityRouter);

// start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
