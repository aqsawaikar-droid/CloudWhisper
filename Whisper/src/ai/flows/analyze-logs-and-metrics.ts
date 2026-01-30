'use server';

/**
 * @fileOverview Analyzes recent error logs and live metrics to identify potential root causes of system issues.
 *
 * - analyzeLogsAndMetrics - A function that handles the analysis of logs and metrics.
 * - AnalyzeLogsAndMetricsInput - The input type for the analyzeLogsAndMetrics function.
 * - AnalyzeLogsAndMetricsOutput - The return type for the analyzeLogsAndMetrics function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeLogsAndMetricsInputSchema = z.object({
  logs: z.string().describe('Recent error logs from the system.'),
  metrics: z.string().describe('Live metrics data from Cloud Monitoring.'),
  userQuestion: z.string().optional().describe('The user question or command.'),
  imageDataUri: z
    .string()
    .optional()
    .describe(
      "An optional image of the issue, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeLogsAndMetricsInput = z.infer<typeof AnalyzeLogsAndMetricsInputSchema>;

const AnalyzeLogsAndMetricsOutputSchema = z.object({
  response: z.string().describe('The primary, conversational response to the user. This should be friendly yet professional and explain the situation clearly.'),
});
export type AnalyzeLogsAndMetricsOutput = z.infer<typeof AnalyzeLogsAndMetricsOutputSchema>;

export async function analyzeLogsAndMetrics(input: AnalyzeLogsAndMetricsInput): Promise<AnalyzeLogsAndMetricsOutput> {
  return analyzeLogsAndMetricsFlow(input);
}

const basePromptTemplate = `You are CloudWhisper, an Autonomous Site Reliability Engineering (SRE) Agent. You are friendly, professional, and an expert in cloud operations.

Your job is to:
1.  **Investigate** production issues by correlating logs, metrics, and user inputs (text, voice, images).
2.  **Decide** on the most likely root cause.
3.  **Propose** a clear, actionable solution in your response.
4.  **Report** your findings and recommendations to the user in a conversational way.

**VERY IMPORTANT: Conversational Behavior**

*   **If the user's input is vague or ambiguous (e.g., "My app is down," "it's not working"), DO NOT GUESS.** Your first response MUST be to ask for more information. Ask for things like: a more detailed description, a screenshot of the error, recent logs, or performance metrics.
*   **If the user provides specific information (logs, metrics, a clear error description, or a screenshot),** proceed with analysis and provide a helpful response.

**Example Scenario 1: Vague Input**
*   User: "My App has an error."
*   Your response: "I can help with that. Could you please provide more details? For example, what is the error message, or could you upload a screenshot of the issue?"

**Example Scenario 2: Specific Input (Image)**
*   User provides a screenshot showing a "PermissionDenied: 403" error for a Google Cloud API.
*   Your response: "I see a 403 Permission Denied error. It looks like the Vision API isn't enabled for your project. The recommended action is to enable it in the Google Cloud Console by navigating to 'APIs & Services > Library', searching for 'Cloud Vision API', and clicking 'Enable'."

**Your Task:**
Analyze the following inputs and generate a conversational response.

**Input Data:**
Logs: {{{logs}}}
Metrics: {{{metrics}}}
User Question: {{{userQuestion}}}
{{#if imageDataUri}}
Screenshot of the issue:
{{media url=imageDataUri}}
{{/if}}
`;

const analyzeLogsAndMetricsPrompt = ai.definePrompt({
  name: 'analyzeLogsAndMetricsPrompt',
  input: { schema: AnalyzeLogsAndMetricsInputSchema },
  output: { schema: AnalyzeLogsAndMetricsOutputSchema },
  prompt: basePromptTemplate,
  model: 'googleai/gemini-2.5-flash',
});


const analyzeLogsAndMetricsFlow = ai.defineFlow(
  {
    name: 'analyzeLogsAndMetricsFlow',
    inputSchema: AnalyzeLogsAndMetricsInputSchema,
    outputSchema: AnalyzeLogsAndMetricsOutputSchema,
  },
  async (input: AnalyzeLogsAndMetricsInput) => {
    const { output } = await analyzeLogsAndMetricsPrompt(input);
    if (!output) {
      return { response: "I'm sorry, I encountered an internal issue and couldn't process your request." };
    }
    return output;
  }
);
