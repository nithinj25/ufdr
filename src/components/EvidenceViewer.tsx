import { useState } from "react";
import MediaViewer from "./MediaViewer";
import type { Evidence } from "../types";

export default function EvidenceViewer({ evidences = [] }: { evidences?: Evidence[] }) {
  const [selected, setSelected] = useState<Evidence | null>(evidences?.[0] ?? null);
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-3">Evidences</h3>
      <div className="flex gap-4">
        <div className="w-64">
          <div className="space-y-3 max-h-[60vh] overflow-auto">
            {evidences?.map(ev => (
              <div
                key={ev.id}
                onClick={() => setSelected(ev)}
                className={`p-2 rounded border cursor-pointer ${selected?.id === ev.id ? "bg-slate-50" : ""}`}
              >
                <div className="text-sm font-medium">{ev.type.toUpperCase()}</div>
                <div className="text-xs text-gray-600 truncate">{ev.snippet}</div>
                <div className="text-xs text-gray-400 mt-1">{ev.ts ? new Date(ev.ts).toLocaleString() : ""}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          {selected ? <MediaViewer item={selected} /> : <div className="text-gray-500">Select evidence to preview</div>}
        </div>
      </div>
    </div>
  );
}
