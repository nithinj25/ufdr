import { useState, useEffect } from "react";
import { client } from '../lib/api';

export default function ReportBuilder({ selected = [] }: { selected?: any[] }) {
  const [items, setItems] = useState<any[]>(selected || []);

  const addSample = async () => {
    const cases = await client.listCases();
    const ev = cases[0]?.evidences?.[0];
    if (ev) setItems(prev => [...prev, ev]);
  };

  // Listen for global add-to-report events
  useEffect(() => {
    const handler = (e: any) => setItems(prev => [...prev, e.detail]);
    window.addEventListener('add-to-report', handler as EventListener);
    return () => window.removeEventListener('add-to-report', handler as EventListener);
  }, []);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="font-semibold mb-2">Report Builder</h4>
      <div className="text-sm text-gray-600 mb-4">Assemble evidence into a report.</div>
      <div className="min-h-[120px] border-dashed border rounded p-4 flex items-center gap-2 flex-wrap">
        {items.length ? items.map((s: any) => <div key={s.id} className="p-2 bg-slate-50 rounded">{s.snippet}</div>) : <div className="text-gray-400">Empty</div>}
      </div>
      <div className="mt-3 flex gap-2">
        <button onClick={exportJson} className="px-3 py-2 bg-[var(--primary)] text-white rounded">Export JSON</button>
        <button onClick={addSample} className="px-3 py-2 border rounded">Add sample evidence</button>
      </div>
    </div>
  );
}
