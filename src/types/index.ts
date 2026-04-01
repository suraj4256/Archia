export type Mode = "plan" | "act";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  mode?: Mode;
}

export interface ChatHistoryEntry {
  role: "user" | "assistant";
  content: string;
}

export interface ChatAPIRequest {
  message: string;
  currentDiagram: string;
  mode: Mode;
  chatHistory: ChatHistoryEntry[];
}

export interface ChatAPIResponse {
  diagram: string;
  explanation: string;
}
