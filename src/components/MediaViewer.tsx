import type { Evidence } from "../types";

interface MediaViewerProps {
  item: Evidence;
}

export default function MediaViewer({ item }: MediaViewerProps) {
  if (!item) return null;

  if (item.type === "image") {
    return (
      <div className="bg-slate-50 p-4 rounded-lg">
        <div className="mb-2 text-sm text-gray-600">Image Preview</div>
        <div className="h-80 flex items-center justify-center bg-white border rounded">
          {/* Note: put sample images in public/assets/ */}
          <img src={`/assets/${item.snippet}`} alt={item.snippet} className="max-h-full max-w-full object-contain" />
        </div>
      </div>
    );
  }

  if (item.type === "message") {
    return (
      <div className="bg-slate-50 p-4 rounded-lg">
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="text-sm text-slate-800">{item.snippet}</div>
          <div className="text-xs text-gray-400 mt-2">{item.ts ? new Date(item.ts).toLocaleString() : ""}</div>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="px-3 py-1 border rounded">Flag</button>
          <button className="px-3 py-1 border rounded">Annotate</button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('add-to-report', { detail: item }))}
            className="px-3 py-1 border rounded bg-[var(--primary)] text-white"
          >
            Add to Report
          </button>
        </div>
      </div>
    );
  }

  return <div>Unsupported evidence type</div>;
}
