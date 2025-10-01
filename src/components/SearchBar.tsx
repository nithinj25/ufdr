import React, { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch?: (q: string) => void }) {
  const [q, setQ] = useState("");
  return (
    <div className="flex items-center gap-2">
      <input
				className="w-full px-3 py-2 rounded-lg bg-slate-800/70 border border-cyan-500/20 text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search across UFDRs — e.g., 'transactions Jan 2025'"
        onKeyDown={(e) => e.key === "Enter" && onSearch?.(q)}
      />
      <button
        onClick={() => onSearch?.(q)}
				className="px-3 py-2 rounded-lg text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
      >
        Search
      </button>
    </div>
  );
}
