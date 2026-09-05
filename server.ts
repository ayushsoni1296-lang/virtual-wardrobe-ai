import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import authRoutes from './server/routes/auth';
import wardrobeRoutes from './server/routes/wardrobe';
import outfitsRoutes from './server/routes/outfits';
import aiRoutes from './server/routes/ai';

const app = express();
const PORT = 3000;

// Middleware for parsing JSON requests (supports base64 photos up to 15MB)
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Virtual Wardrobe Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    firebaseConnected: true,
    geminiConnected: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Mount Modular API Routes
app.use('/api/auth', authRoutes);
app.use('/api/wardrobe', wardrobeRoutes);
app.use('/api/outfits', outfitsRoutes);
app.use('/api/ai', aiRoutes);

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Virtual Wardrobe Backend] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
