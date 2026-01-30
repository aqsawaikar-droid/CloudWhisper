'use server';
/**
 * @fileOverview Generates a short title for a new conversation.
 *
 * - generateTitle - A function that creates a title from the user's first message.
 * - GenerateTitleInput - The input type for the generateTitle function.
 * - GenerateTitleOutput - The return type for the generateTitle function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateTitleInputSchema = z.object({
  message: z.string().describe('The first message from the user in a new conversation.'),
});
export type GenerateTitleInput = z.infer<typeof GenerateTitleInputSchema>;

const GenerateTitleOutputSchema = z.object({
  title: z.string().describe('A short, concise title for the conversation (5 words or less).'),
});
export type GenerateTitleOutput = z.infer<typeof GenerateTitleOutputSchema>;

export async function generateTitle(input: GenerateTitleInput): Promise<GenerateTitleOutput> {
  return generateTitleFlow(input);
}

const generateTitlePrompt = ai.definePrompt({
  name: 'generateTitlePrompt',
  input: { schema: GenerateTitleInputSchema },
  output: { schema: GenerateTitleOutputSchema },
  prompt: `Based on the following user message, generate a short, concise title for the conversation. The title should be 5 words or less.

Message: {{{message}}}
`,
});

const generateTitleFlow = ai.defineFlow(
  {
    name: 'generateTitleFlow',
    inputSchema: GenerateTitleInputSchema,
    outputSchema: GenerateTitleOutputSchema,
  },
  async (input) => {
    const { output } = await generateTitlePrompt(input);
    return output!;
  }
);
