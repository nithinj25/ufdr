import type { CaseItem } from "../types";

const cases: CaseItem[] = [
  {
    id: "CASE-001",
    title: "Financial Fraud — Device Cluster A",
    description: "UFDR extracted from 3 devices; focus on WhatsApp chats and bank SMS.",
    createdAt: "2025-08-24",
    suspects: ["+91 98765 43210", "user123"],
    evidences: [
      { id: "E-1", type: "message", snippet: "I sent the money to your account", ts: "2025-07-01T10:10:00Z" },
      { id: "E-2", type: "image", snippet: "screenshot_txn.png", ts: "2025-07-01T10:12:00Z" }
    ]
  },
  {
    id: "CASE-002",
    title: "Phishing Campaign — Target: Defence Staff",
    description: "OSINT & UFDR matches to identify malicious senders.",
    createdAt: "2025-09-02",
    suspects: ["phish_sender"],
    evidences: [
      { id: "E-3", type: "message", snippet: "Please verify your OTP 1234", ts: "2025-09-01T08:00:00Z" }
    ]
  },
  {
    id: "CASE-003",
    title: "Crypto Scam Ring — Wallet Tracing",
    description: "Graph correlation of wallet addresses across Telegram groups.",
    createdAt: "2025-09-12",
    suspects: ["0xAbC...123", "tg_user_42"],
    evidences: [
      { id: "E-4", type: "image", snippet: "wallet_flow.png", ts: "2025-09-11T12:05:00Z" },
      { id: "E-5", type: "message", snippet: "Send to 0xAbC...123 by 6pm", ts: "2025-09-11T12:06:00Z" },
      { id: "E-6", type: "video", snippet: "screen_recording.mp4", ts: "2025-09-11T12:10:00Z" }
    ]
  },
  {
    id: "CASE-004",
    title: "Insider Leak — Confidential Docs",
    description: "Leaked PDFs detected via email and cloud sync logs.",
    createdAt: "2025-09-18",
    suspects: ["employee77", "+91 91234 56780"],
    evidences: [
      { id: "E-7", type: "image", snippet: "doc_hash_match.png", ts: "2025-09-18T09:02:00Z" },
      { id: "E-8", type: "message", snippet: "Share the doc via drive link", ts: "2025-09-18T09:05:00Z" }
    ]
  },
  {
    id: "CASE-005",
    title: "SIM Swap — Banking Compromise",
    description: "SMS OTP interception attempts and device switch timeline.",
    createdAt: "2025-09-22",
    suspects: ["sim_swapper"],
    evidences: [
      { id: "E-9", type: "message", snippet: "Your OTP is 7788", ts: "2025-09-22T18:20:00Z" },
      { id: "E-10", type: "message", snippet: "SIM changed successfully", ts: "2025-09-22T18:45:00Z" }
    ]
  }
];

function search(q?: string) {
  if (!q) return [];
  const lc = q.toLowerCase();
  const results: any[] = [];
  cases.forEach((c) => {
    (c.evidences || []).forEach((e) => {
      if (e.snippet.toLowerCase().includes(lc)) {
        results.push({ ...e, caseId: c.id, caseTitle: c.title });
      }
    });
  });
  return results;
}

export default { cases, search };
