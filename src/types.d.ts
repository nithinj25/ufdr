export type Evidence = {
  id: string;
  type: "message" | "image" | "video" | string;
  snippet: string;
  ts?: string;
};

export type CaseItem = {
  id: string;
  title: string;
  name?: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
  suspects?: string[];
  evidences?: Evidence[];
};
