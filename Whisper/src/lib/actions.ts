'use server';

import { analyzeLogsAndMetrics } from '@/ai/flows/analyze-logs-and-metrics';
import type { AnalyzeLogsAndMetricsInput, AnalyzeLogsAndMetricsOutput } from '@/ai/flows/analyze-logs-and-metrics';
import { speechToText, type SpeechToTextInput } from '@/ai/flows/speech-to-text';
import { generateTitle, type GenerateTitleInput } from '@/ai/flows/generate-title';

export async function runAnalysis(
  input: AnalyzeLogsAndMetricsInput
): Promise<AnalyzeLogsAndMetricsOutput | null> {
  try {
    const analysisOutput = await analyzeLogsAndMetrics(input);
    return analysisOutput;
  } catch (error) {
    console.error('An error occurred during the analysis and summarization flow:', error);
    return null;
  }
}

export async function runSpeechToText(input: SpeechToTextInput): Promise<string> {
  try {
    const result = await speechToText(input);
    return result.transcription;
  } catch (error) {
    console.error('An error occurred during speech-to-text:', error);
    return '';
  }
}

export async function runGenerateTitle(input: GenerateTitleInput): Promise<{title: string} | null> {
    try {
        const result = await generateTitle(input);
        return result;
    } catch (error) {
        console.error('An error occurred during title generation:', error);
        return null;
    }
}
