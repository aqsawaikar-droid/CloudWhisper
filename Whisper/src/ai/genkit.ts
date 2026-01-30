import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { firebaseConfig } from '@/firebase/config';

// Validate Google API Key
if (!process.env.GOOGLE_API_KEY) {
  console.error(
    '\n❌ ERROR: GOOGLE_API_KEY is not set!\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
    '📋 To fix this issue:\n' +
    '   1. Copy .env.example to .env.local\n' +
    '   2. Get your API key from: https://makersuite.google.com/app/apikey\n' +
    '   3. Add it to .env.local: GOOGLE_API_KEY=your_key_here\n' +
    '   4. Restart the development server\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
  );

  if (process.env.NODE_ENV === 'production') {
    throw new Error('GOOGLE_API_KEY environment variable is required');
  }
}

const globalForGenkit = global as unknown as {
  ai: any | undefined
}

export const ai =
  globalForGenkit.ai ??
  genkit({
    plugins: [googleAI({
      apiKey: process.env.GOOGLE_API_KEY
    })],
    model: 'googleai/gemini-2.5-flash',
  });

if (process.env.NODE_ENV !== 'production') globalForGenkit.ai = ai
