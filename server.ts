/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Local messages storage file for server persistence
const MESSAGES_FILE = path.join(__dirname, 'messages_store.json');

function readMessages() {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const data = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading messages file:', err);
  }
  return [];
}

function writeMessages(messages: any[]) {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing messages file:', err);
  }
}

// Contact form API endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  // Basic email pattern validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const id = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const messageRecord = {
    id,
    name: String(name).slice(0, 100),
    email: String(email).slice(0, 150),
    subject: String(subject || 'Portfolio Inquiry').slice(0, 200),
    message: String(message).slice(0, 3000),
    timestamp: new Date().toISOString(),
    read: false,
    userAgent: req.headers['user-agent'] || 'unknown',
  };

  const messages = readMessages();
  messages.unshift(messageRecord);
  writeMessages(messages);

  console.log(`[Contact Form Received] From: ${name} <${email}> | Subject: ${subject}`);

  // If a webhook or SMTP is configured via env vars, forward here
  if (process.env.NOTIFICATION_WEBHOOK_URL) {
    try {
      await fetch(process.env.NOTIFICATION_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `📬 **New Portfolio Inquiry for Zekarias Zenebe Ababu**\n**From:** ${name} (${email})\n**Subject:** ${subject}\n**Message:**\n${message}`
        })
      });
    } catch (whErr) {
      console.warn('Webhook delivery notice:', whErr);
    }
  }

  return res.status(200).json({
    success: true,
    message: 'Message delivered to Zekarias Zenebe Ababu successfully.',
    id
  });
});

// Admin endpoints for reading and managing contact inquiries
app.get('/api/messages', (req, res) => {
  const messages = readMessages();
  res.json(messages);
});

app.delete('/api/messages/:id', (req, res) => {
  const { id } = req.params;
  let messages = readMessages();
  messages = messages.filter((m: any) => m.id !== id);
  writeMessages(messages);
  res.json({ success: true });
});

// Setup Vite in Dev or serve static in Prod
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer();
