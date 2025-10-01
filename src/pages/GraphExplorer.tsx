import { useEffect, useState } from 'react';
import GraphPanel from '../components/GraphPanel';
import { client } from '../lib/api';
import type { CaseItem } from '../types';
import { Network, Search, Filter, Zap, Shield, AlertTriangle, Activity, RefreshCw } from 'lucide-react';

export default function GraphExplorer() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    // Fetch cases when component mounts
    const fetchCases = async () => {
      try {
        setLoading(true);
        const result = await client.listCases();
        setCases(result);
      } catch (error) {
        console.error('Error fetching cases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();

    // Animated scan progress
    const scanInterval = setInterval(() => {
      setScanProgress(prev => (prev >= 100 ? 0 : prev + 2));
    }, 100);

    return () => clearInterval(scanInterval);
  }, []);

  const filteredCases = cases.filter(caseItem =>
    caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseItem.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] opacity-20"></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block p-6 bg-slate-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl mb-4">
              <Network className="w-16 h-16 text-cyan-400 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Initializing Graph Network</h2>
            <p className="text-cyan-400 font-mono text-sm">Loading forensic data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!cases.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] opacity-20"></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                <Network className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">Graph Explorer</h1>
            </div>
            <p className="text-cyan-400 font-mono text-sm">FORENSIC NETWORK VISUALIZATION</p>
          </div>

          {/* Empty State */}
          <div className="max-w-2xl mx-auto mt-20">
            <div className="bg-slate-800/40 backdrop-blur-xl border border-red-500/30 rounded-2xl p-12 text-center shadow-2xl shadow-red-500/10">
              <div className="inline-block p-6 bg-red-500/10 rounded-full mb-6">
                <AlertTriangle className="w-16 h-16 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">No Cases Available</h2>
              <p className="text-gray-400 mb-6">
                No forensic cases found in the system. Upload case data to begin analysis.
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:scale-105 transition-all duration-300">
                Import Case Data
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] opacity-20"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      
      <div className="relative z-10 p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/50">
                  <Network className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white">Graph Explorer</h1>
              </div>
              <p className="text-cyan-400 font-mono text-sm">FORENSIC NETWORK VISUALIZATION SYSTEM</p>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full backdrop-blur-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-mono">{cases.length} ACTIVE</span>
              </div>
              <button className="p-2 bg-slate-800/40 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/10 transition-colors">
                <RefreshCw className="w-5 h-5 text-cyan-400" />
              </button>
            </div>
          </div>

          {/* Control Panel */}
          <div className="bg-slate-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-4 shadow-xl">
            <div className="flex flex-wrap items-center gap-4">
              {/* Search Bar */}
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                  <input
                    type="text"
                    placeholder="Search cases by ID or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all font-mono text-sm"
                  />
                </div>
              </div>

              {/* Filter Button */}
              <button className="px-4 py-2 bg-slate-700/50 border border-purple-500/30 text-purple-300 rounded-lg hover:bg-purple-500/20 hover:border-purple-400 transition-all flex items-center gap-2 font-mono text-sm">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>

              {/* Quick Stats */}
              <div className="flex items-center gap-4 px-4 py-2 bg-slate-900/50 border border-cyan-500/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span className="text-white font-mono text-sm">{filteredCases.length}</span>
                </div>
                <div className="w-px h-4 bg-cyan-500/30"></div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-white font-mono text-sm">Secure</span>
                </div>
              </div>
            </div>

            {/* Scan Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono text-cyan-400">NETWORK SCAN IN PROGRESS</span>
                <span className="text-xs font-mono text-cyan-400">{scanProgress}%</span>
              </div>
              <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-100 shadow-lg shadow-cyan-500/50"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Cases Grid */}
        {filteredCases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map(caseItem => (
              <div 
                key={caseItem.id}
                className="bg-slate-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl overflow-hidden shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <GraphPanel caseData={caseItem} />
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto mt-12">
            <div className="bg-slate-800/40 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-8 text-center">
              <div className="inline-block p-4 bg-yellow-500/10 rounded-full mb-4">
                <Search className="w-12 h-12 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Results Found</h3>
              <p className="text-gray-400">
                No cases match your search criteria. Try different keywords.
              </p>
            </div>
          </div>
        )}

        {/* Bottom Status Bar */}
        <div className="mt-8 bg-slate-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-4">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-400 font-mono">Real-time Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-gray-400 font-mono">Encrypted</span>
              </div>
            </div>
            <div className="text-gray-500 font-mono text-xs">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}