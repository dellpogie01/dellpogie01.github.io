import { ChatMessage } from '../types';

export async function sendChatMessage(messages: ChatMessage[], useThinking: boolean = false): Promise<string> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, useThinking })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to connect to AI assistant.');
    return data.reply;
  } catch (err: any) {
    console.error('Chat error:', err);
    throw err;
  }
}

export async function generateAiConcept(prompt: string): Promise<string> {
  try {
    const res = await fetch('/api/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to generate AI concept.');
    return data.text;
  } catch (err: any) {
    console.error('Generation error:', err);
    throw err;
  }
}
