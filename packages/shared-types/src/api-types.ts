export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface CallSummary {
  id: string;
  callId: string;
  transcript: string;
  keyPoints: string[];
  actionItems: string[];
}

export interface CommonResponse<T = any> {
  response: T;
  message: string;
  code: number;
}
