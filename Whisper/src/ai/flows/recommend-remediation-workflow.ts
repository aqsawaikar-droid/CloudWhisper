'use server';

/**
 * @fileOverview This file defines a Genkit flow for recommending a pre-approved remediation workflow based on the GenAI analysis of an issue and its severity.
 *
 * - recommendRemediationWorkflow - A function that takes issue analysis as input and returns a recommendation for a remediation workflow.
 * - RecommendRemediationWorkflowInput - The input type for the recommendRemediationWorkflow function.
 * - RecommendRemediationWorkflowOutput - The return type for the recommendRemediationWorkflow function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendRemediationWorkflowInputSchema = z.object({
  issue: z.string().describe('Root cause summary of the issue.'),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH']).describe('Severity of the issue.'),
  confidence: z.number().describe('Confidence level in the issue analysis (0.0 - 1.0).'),
  logs: z.string().describe('Relevant error logs from the system.'),
  metrics: z.string().describe('Live metrics from Cloud Monitoring.'),
  requires_confirmation: z.boolean().describe('Whether the action requires user confirmation.'),
});
export type RecommendRemediationWorkflowInput = z.infer<typeof RecommendRemediationWorkflowInputSchema>;

const RecommendRemediationWorkflowOutputSchema = z.object({
  recommended_action: z.string().describe('Name of the recommended remediation workflow.'),
  reasoning: z.string().describe('Short explanation of why this action is chosen.'),
});
export type RecommendRemediationWorkflowOutput = z.infer<typeof RecommendRemediationWorkflowOutputSchema>;

export async function recommendRemediationWorkflow(
  input: RecommendRemediationWorkflowInput
): Promise<RecommendRemediationWorkflowOutput> {
  return recommendRemediationWorkflowFlow(input);
}

const recommendRemediationWorkflowPrompt = ai.definePrompt({
  name: 'recommendRemediationWorkflowPrompt',
  input: {schema: RecommendRemediationWorkflowInputSchema},
  output: {schema: RecommendRemediationWorkflowOutputSchema},
  prompt: `You are CloudWhisper, an experienced SRE assistant. Based on the following issue analysis, logs and metrics, recommend a pre-approved remediation workflow.

Issue: {{{issue}}}
Severity: {{{severity}}}
Confidence: {{{confidence}}}
Logs: {{{logs}}}
Metrics: {{{metrics}}}
Requires Confirmation: {{{requires_confirmation}}}

Consider the severity and confidence level when selecting the appropriate workflow. Explain your reasoning for choosing the recommended action.

Respond with the workflow name and reasoning.

Your response should contain the "recommended_action" and the "reasoning".
`,
});

const recommendRemediationWorkflowFlow = ai.defineFlow(
  {
    name: 'recommendRemediationWorkflowFlow',
    inputSchema: RecommendRemediationWorkflowInputSchema,
    outputSchema: RecommendRemediationWorkflowOutputSchema,
  },
  async input => {
    const {output} = await recommendRemediationWorkflowPrompt(input);
    return output!;
  }
);
