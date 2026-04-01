export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface ChatAPIRequest {
  message: string;
  currentDiagram: string;
}

export interface ChatAPIResponse {
  diagram: string;
  explanation: string;
}
