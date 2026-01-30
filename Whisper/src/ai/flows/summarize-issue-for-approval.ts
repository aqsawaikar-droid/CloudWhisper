'use server';
/**
 * @fileOverview Summarizes the identified issue and proposed remediation action for SRE approval.
 *
 * - summarizeIssueForApproval - A function that summarizes the issue and proposed action.
 * - SummarizeIssueForApprovalInput - The input type for the summarizeIssueForApproval function.
 * - SummarizeIssueForApprovalOutput - The return type for the summarizeIssueForApproval function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeIssueForApprovalInputSchema = z.object({
  issue: z.string().describe('Root cause summary of the issue.'),
  severity: z.string().describe('Severity of the issue (LOW, MEDIUM, HIGH).'),
  confidence: z.number().describe('Confidence level in the diagnosis (0.0 to 1.0).'),
  recommended_action: z.string().describe('Name of the recommended Argo workflow.'),
  reasoning: z.string().describe('Explanation of why this action is chosen.'),
});
export type SummarizeIssueForApprovalInput = z.infer<typeof SummarizeIssueForApprovalInputSchema>;

const SummarizeIssueForApprovalOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the issue and proposed remediation action for SRE approval.'),
});
export type SummarizeIssueForApprovalOutput = z.infer<typeof SummarizeIssueForApprovalOutputSchema>;

export async function summarizeIssueForApproval(input: SummarizeIssueForApprovalInput): Promise<SummarizeIssueForApprovalOutput> {
  return summarizeIssueForApprovalFlow(input);
}

const summarizeIssueForApprovalPrompt = ai.definePrompt({
  name: 'summarizeIssueForApprovalPrompt',
  input: {schema: SummarizeIssueForApprovalInputSchema},
  output: {schema: SummarizeIssueForApprovalOutputSchema},
  prompt: `You are CloudWhisper, an SRE assistant summarizing an identified issue and a proposed remediation for SRE approval.

  Issue: {{{issue}}}
  Severity: {{{severity}}}
  Confidence: {{{confidence}}}
  Recommended Action: {{{recommended_action}}}
  Reasoning: {{{reasoning}}}

  Provide a concise summary of the issue, the proposed action, and the reasoning behind it. The summary should be no more than two sentences. Communicate clearly and professionally.
  `,
});

const summarizeIssueForApprovalFlow = ai.defineFlow(
  {
    name: 'summarizeIssueForApprovalFlow',
    inputSchema: SummarizeIssueForApprovalInputSchema,
    outputSchema: SummarizeIssueForApprovalOutputSchema,
  },
  async input => {
    const {output} = await summarizeIssueForApprovalPrompt(input);
    return output!;
  }
);
