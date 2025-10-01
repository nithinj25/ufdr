import { useState } from 'react';
import { Users, Settings, FileSearch, Shield, Database, RefreshCw } from 'lucide-react';

export default function Admin() {
  const [refreshing, setRefreshing] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden p-6">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] opacity-20"></div>
      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/50">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <p className="text-cyan-400 font-mono text-sm">SYSTEM CONFIGURATION & AUDIT</p>
          </div>
          <button
            onClick={async () => { setRefreshing(true); await new Promise(r=>setTimeout(r, 600)); setRefreshing(false); }}
            className="px-4 py-2 bg-slate-800/40 border border-cyan-500/20 rounded-lg flex items-center gap-2 hover:bg-cyan-500/10"
          >
            <RefreshCw className={`w-4 h-4 text-cyan-400 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="text-cyan-300 text-sm font-mono">Refresh</span>
          </button>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group border border-cyan-500/20 rounded-xl p-5 bg-slate-900/30 hover:bg-cyan-500/10 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-cyan-500/20 rounded">
                  <Users className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="font-semibold text-white">User Management</h3>
              </div>
              <p className="text-sm text-gray-300 mb-4">Manage users and permissions.</p>
              <button className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                Manage Users
              </button>
            </div>

            <div className="group border border-cyan-500/20 rounded-xl p-5 bg-slate-900/30 hover:bg-purple-500/10 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-500/20 rounded">
                  <Settings className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="font-semibold text-white">System Settings</h3>
              </div>
              <p className="text-sm text-gray-300 mb-4">Configure system-wide preferences.</p>
              <button className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                Configure
              </button>
            </div>

            <div className="group border border-cyan-500/20 rounded-xl p-5 bg-slate-900/30 hover:bg-pink-500/10 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-pink-500/20 rounded">
                  <FileSearch className="w-5 h-5 text-pink-400" />
                </div>
                <h3 className="font-semibold text-white">Audit Logs</h3>
              </div>
              <p className="text-sm text-gray-300 mb-4">View system audit logs and activities.</p>
              <button className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                View Logs
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-slate-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              <span className="text-gray-400 font-mono text-sm">Admin actions are simulated in demo</span>
            </div>
            <div className="text-gray-500 font-mono text-xs">Last updated: {new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}