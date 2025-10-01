export type Evidence = {
  id: string;
  type: "message" | "image" | "video" | string;
  snippet: string;
  ts?: string;
};

export type CaseItem = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  suspects?: string[];
  evidences?: Evidence[];
};
