import { useEffect, useMemo, useState } from 'react';
import { FileText, BarChart3, Activity, Shield, Zap } from 'lucide-react';
import { client } from '../lib/api';
import type { CaseItem, Evidence } from '../types';

export default function Reports() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const data = await client.listCases();
        setCases(data);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const { totalEvidences, evidenceByType, allEvidence } = useMemo(() => {
    const all: Evidence[] = [];
    cases.forEach(c => (c.evidences || []).forEach(e => all.push(e)));
    const byType = all.reduce<Record<string, number>>((acc, e) => {
      const k = e.type || 'other';
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {});
    return { totalEvidences: all.length, evidenceByType: byType, allEvidence: all };
  }, [cases]);

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const typesSorted = useMemo(() => Object.entries(evidenceByType).sort((a,b)=>b[1]-a[1]), [evidenceByType]);
  const maxTypeCount = useMemo(() => typesSorted[0]?.[1] || 1, [typesSorted]);
  const filteredEvidence = useMemo(() => {
    const list = selectedType ? allEvidence.filter(e => (e.type || 'other') === selectedType) : allEvidence;
    return list.slice(0, 6);
  }, [allEvidence, selectedType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden p-6">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] opacity-20"></div>
      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/50">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">Reports</h1>
            </div>
            <p className="text-cyan-400 font-mono text-sm">AUTOMATED INVESTIGATION REPORTS</p>
          </div>
          <div className="px-4 py-2 bg-slate-800/40 border border-cyan-500/20 rounded-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-300 text-sm font-mono">Ready</span>
          </div>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group border border-cyan-500/20 rounded-xl p-5 bg-slate-900/30 hover:bg-cyan-500/10 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-cyan-500/20 rounded">
                  <Shield className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="font-semibold text-white">Case Summary Report</h3>
              </div>
              <p className="text-sm text-gray-300 mb-4">Comprehensive summary of all cases and their status.</p>
              <button className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                Generate Report
              </button>
            </div>

            <div className="group border border-cyan-500/20 rounded-xl p-5 bg-slate-900/30 hover:bg-purple-500/10 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-500/20 rounded">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="font-semibold text-white">Evidence Analysis</h3>
              </div>
              <p className="text-sm text-gray-300 mb-4">Breakdown by type with recent items. Click a type to filter.</p>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="px-2 py-1 text-xs rounded bg-slate-900/50 border border-cyan-500/30 text-cyan-300">Total: {totalEvidences}</span>
                <button
                  onClick={() => setSelectedType(null)}
                  className={`px-2 py-1 text-xs rounded border ${selectedType===null ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-900/50 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/10'}`}
                >All</button>
                {typesSorted.map(([k,v]) => (
                  <button
                    key={k}
                    onClick={() => setSelectedType(k)}
                    className={`px-2 py-1 text-xs rounded border ${selectedType===k ? 'bg-purple-600 text-white border-purple-400' : 'bg-slate-900/50 text-purple-300 border-purple-500/30 hover:bg-purple-500/10'}`}
                  >{k}: {v}</button>
                ))}
              </div>

              <div className="mb-4 space-y-2">
                {typesSorted.map(([k,v]) => (
                  <div key={k} className="flex items-center gap-3">
                    <div className="text-xs text-gray-300 w-24 truncate">{k}</div>
                    <div className="flex-1 h-2 bg-slate-800 rounded">
                      <div
                        className={`${k==='message' ? 'bg-cyan-500' : k==='image' ? 'bg-purple-500' : 'bg-pink-500'} h-2 rounded`}
                        style={{ width: `${Math.max(6, Math.round((v/maxTypeCount)*100))}%` }}
                      />
                    </div>
                    <div className="w-8 text-right text-xs text-gray-400 font-mono">{v}</div>
                  </div>
                ))}
                {!typesSorted.length && (
                  <div className="text-sm text-gray-500">No evidence to analyze.</div>
                )}
              </div>

              <div className="border border-cyan-500/20 rounded-lg divide-y divide-cyan-500/10 overflow-hidden bg-slate-900/40">
                {filteredEvidence.map((e, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${e.type==='message' ? 'bg-cyan-400' : e.type==='image' ? 'bg-purple-400' : 'bg-pink-400'}`}></div>
                      <div className="text-sm text-gray-200 truncate max-w-[320px]">{e.snippet}</div>
                    </div>
                    <div className="text-xs text-gray-400 font-mono">{e.type}</div>
                  </div>
                ))}
                {!filteredEvidence.length && (
                  <div className="p-3 text-sm text-gray-500">No evidence available.</div>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                <button className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                  Generate Report
                </button>
                <span className="text-xs text-cyan-300 font-mono self-center">{loading ? 'Loading…' : 'Updated'}</span>
              </div>
            </div>

            <div className="group border border-cyan-500/20 rounded-xl p-5 bg-slate-900/30 hover:bg-pink-500/10 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-pink-500/20 rounded">
                  <Activity className="w-5 h-5 text-pink-400" />
                </div>
                <h3 className="font-semibold text-white">Activity Timeline</h3>
              </div>
              <p className="text-sm text-gray-300 mb-4">Timeline of case activities and key events.</p>
              <button className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                Generate Report
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-slate-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-gray-400 font-mono text-sm">Reports render in browser for demo</span>
            </div>
            <div className="text-gray-500 font-mono text-xs">Last updated: {new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}