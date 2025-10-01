import type { CaseItem } from "../types";
import mock from "../data/mock";

export const client = {
  listCases: async (): Promise<CaseItem[]> => {
    await new Promise((r) => setTimeout(r, 200));
    return mock.cases;
  },
  getCase: async (caseId: string): Promise<CaseItem | undefined> => {
    await new Promise((r) => setTimeout(r, 150));
    return mock.cases.find((c) => c.id === caseId);
  },
  search: async (q?: string) => {
    await new Promise((r) => setTimeout(r, 120));
    return mock.search(q);
  },
  // Demo runner returns the mock cases and optionally sets a delay
  runDemo: async (delay = 300) => {
    await new Promise((r) => setTimeout(r, delay));
    return { cases: mock.cases, message: 'Demo results loaded' };
  }
};
