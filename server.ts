import express from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// API endpoint for Gemini chat (Juan AI Assistant)
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, useThinking } = req.body;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
    }

    const modelName = useThinking ? 'gemini-4-argon' : 'gemini-3.8-flash';
    
    const systemInstruction = `You are Juan AI Assistant, the friendly virtual assistant for JuanMediaHubPH (independent Android developer). 
You help visitors explore Juan's portfolio apps (Colors of Faith, Holy Bible KJV 1611, Pic To PDF, MedsAlarm, CapybaRun, GALA, SoloChess3D). 
Keep answers helpful, concise, warm, and professional. Mention that Juan's apps are built with Kotlin, Jetpack Compose, and Material Design 3.`;

    const contents = messages.map((m: any) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    const config: any = {
      systemInstruction,
    };

    if (useThinking) {
      config.thinkingConfig = { thinkingLevel: 'HIGH' };
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents,
      config
    });

    res.json({ reply: response.text || 'No response generated.' });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate chat response.' });
  }
});

// API endpoint for AI Image Generation
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: `Generate a stunning UI concept illustration or icon for an Android app based on this prompt: ${prompt}` }] }]
    });

    res.json({ text: response.text || 'Image concept generated successfully.' });
  } catch (error: any) {
    console.error('Image generation error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate image concept.' });
  }
});

// Mount vite middleware in development
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

const PORT = Number(process.env.PORT || 3000);
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    const altPort = PORT + 1;
    console.log(`Port ${PORT} in use, trying port ${altPort}...`);
    app.listen(altPort, '0.0.0.0', () => {
      console.log(`Server running on port ${altPort}`);
    });
  } else {
    console.error('Server error:', err);
  }
});
