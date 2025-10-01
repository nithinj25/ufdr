
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { client } from "../lib/api";
import EvidenceViewer from "../components/EvidenceViewer";
import GraphPanel from "../components/GraphPanel";
import type { CaseItem } from "../types";
import { 
  FileText, 
  Calendar, 
  Shield, 
  AlertCircle, 
  Download, 
  Share2, 
  UserPlus, 
  FileEdit, 
  Activity,
  Lock,
  ChevronLeft,
  Clock,
  Zap
} from "lucide-react";

export default function CaseDetail() {
  const { caseId } = useParams<{ caseId: string }>();
  const [c, setC] = useState<CaseItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (caseId) {
      setLoading(true);
      client.getCase(caseId).then((res) => {
        setC(res ?? null);
        setLoading(false);
      });
    }
  }, [caseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] opacity-20"></div>
        
        {/* Glowing Orb */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block p-6 bg-slate-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl mb-4">
              <Activity className="w-16 h-16 text-cyan-400 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Loading Case Data</h2>
            <p className="text-cyan-400 font-mono text-sm">Decrypting forensic evidence...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!c) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] opacity-20"></div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
          <div className="max-w-md w-full bg-slate-800/40 backdrop-blur-xl border border-red-500/30 rounded-2xl p-12 text-center">
            <div className="inline-block p-6 bg-red-500/10 rounded-full mb-6">
              <AlertCircle className="w-16 h-16 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Case Not Found</h2>
            <p className="text-gray-400">The requested case could not be located in the system.</p>
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
        {/* Header */}
        <div className="mb-6">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-lg text-cyan-400 hover:bg-cyan-500/10 transition-colors mb-4 font-mono text-sm">
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Cases</span>
          </button>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/50">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{c.title}</h1>
                <p className="text-cyan-400 font-mono text-sm">CASE ID: {caseId}</p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-mono">ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Case Overview Card */}
            <div className="bg-slate-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Case Overview</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-cyan-400 uppercase mb-1 block">Description</label>
                  <p className="text-gray-300 leading-relaxed">{c.description}</p>
                </div>

                {/* Meta Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-cyan-500/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-mono">Created</div>
                      <div className="text-sm text-white font-mono">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Clock className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-mono">Last Updated</div>
                      <div className="text-sm text-white font-mono">
                        {new Date(c.updatedAt || c.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <Lock className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-mono">Security</div>
                      <div className="text-sm text-white font-mono">Encrypted</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence Viewer */}
            <div className="bg-slate-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Evidence Analysis</h2>
              </div>
              <EvidenceViewer evidences={c.evidences} />
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <aside className="space-y-6">
            {/* Graph Panel */}
            <div className="bg-slate-800/40 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden shadow-xl">
              <GraphPanel caseData={c} />
            </div>

            {/* Quick Actions Card */}
            <div className="bg-slate-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 shadow-xl">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                Quick Actions
              </h4>
              
              <div className="space-y-3">
                <button className="w-full group relative px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:scale-105 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    <span>Generate Report</span>
                  </div>
                </button>

                <button className="w-full px-4 py-3 bg-slate-700/50 border-2 border-purple-500/50 text-purple-300 rounded-lg font-semibold hover:bg-purple-500/20 hover:border-purple-400 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                  <FileEdit className="w-4 h-4" />
                  <span>Add Note</span>
                </button>

                <button className="w-full px-4 py-3 bg-slate-700/50 border-2 border-green-500/50 text-green-300 rounded-lg font-semibold hover:bg-green-500/20 hover:border-green-400 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  <span>Assign Case</span>
                </button>

                <button className="w-full px-4 py-3 bg-slate-700/50 border-2 border-cyan-500/50 text-cyan-300 rounded-lg font-semibold hover:bg-cyan-500/20 hover:border-cyan-400 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  <span>Share Case</span>
                </button>
              </div>
            </div>

            {/* Status Panel */}
            <div className="bg-slate-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 shadow-xl">
              <h4 className="text-lg font-bold text-white mb-4">System Status</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300 font-mono">Analysis Engine</span>
                  </div>
                  <span className="text-xs text-green-400 font-mono">ONLINE</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300 font-mono">Data Integrity</span>
                  </div>
                  <span className="text-xs text-green-400 font-mono">VERIFIED</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300 font-mono">Last Sync</span>
                  </div>
                  <span className="text-xs text-cyan-400 font-mono">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom Status Bar */}
        <div className="mt-8 bg-slate-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-4">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-400 font-mono">Secure Connection</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-400" />
                <span className="text-gray-400 font-mono">End-to-End Encrypted</span>
              </div>
            </div>
            <div className="text-gray-500 font-mono text-xs">
              Session active | {new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}