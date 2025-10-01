import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { client } from "../lib/api";
import CaseList from "../components/CaseList";
import type { CaseItem } from "../types";

export default function Cases(){
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [demoMode, setDemoMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const result = await client.listCases();
        setCases(result);
      } catch (error) {
        console.error('Error fetching cases:', error);
      }
    };

    fetchCases();
    if (sessionStorage.getItem('demoMode')){
      setDemoMode(true);
      setTimeout(() => { setDemoMode(false); sessionStorage.removeItem('demoMode'); }, 3000);
    }
  }, []);
  useEffect(() => {
    const url = new URLSearchParams(location.search);
    const q = url.get('q') || '';
    setQuery(q);
  }, [location.search]);
  const [query, setQuery] = useState('');
  const filtered = cases.filter(c =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    (c.suspects || []).some(s => s.toLowerCase().includes(query.toLowerCase()))
  );
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Cases</h2>
        <div>
          <button className="px-3 py-2 rounded bg-[var(--primary)] text-white">New Case</button>
        </div>
      </div>
      {demoMode && (
        <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800">Demo mode: loaded sample results</div>
      )}
      <div className="mb-4">
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by title or suspect" className="w-full p-2 border rounded" />
      </div>
      <CaseList items={filtered} />
    </div>
  );
}
