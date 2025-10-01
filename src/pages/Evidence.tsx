import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { client } from '../lib/api';

export default function Evidence() {
  const { evidenceId } = useParams<{ evidenceId: string }>();
  const [item, setItem] = useState<any | null>(null);

  useEffect(() => {
    // find evidence in mock
    const load = async () => {
      const cases = await client.listCases();
      for (const c of cases) {
        const ev = (c.evidences || []).find((e: any) => e.id === evidenceId);
        if (ev) { setItem({ ...ev, caseId: c.id, caseTitle: c.title }); break; }
      }
    };
    load();
  }, [evidenceId]);

  if (!item) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Evidence: {item.id}</h2>
        <Link to={`/cases/${item.caseId}`} className="text-sm text-blue-600">Open Case</Link>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <div className="text-sm text-gray-700">Type: <strong>{item.type}</strong></div>
        <div className="mt-2 text-sm text-gray-700">Snippet: {item.snippet}</div>
        <div className="mt-2 text-xs text-gray-500">Found in case: {item.caseTitle}</div>
      </div>
    </div>
  );
}
