import type { AnalyzeLogsAndMetricsOutput } from "@/ai/flows/analyze-logs-and-metrics";

export type Conversation = {
  id: string;
  userId: string;
  title: string;
  startTime: string;
};

export type Message = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  analysis?: AnalyzeLogsAndMetricsOutput | null;
  imageUri?: string | null;
  isTyping?: boolean;
  timestamp: number;
};

export type Workflow = {
  id: string;
  userId: string;
  name: string;
  description: string;
  steps: string;
};
