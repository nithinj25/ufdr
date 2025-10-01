import { NavLink } from "react-router-dom";
import { 
  Home, 
  Database, 
  Network, 
  FileText, 
  Settings, 
  Clock, 
  AlertTriangle,
  Shield,
  Zap,
  ChevronRight
} from 'lucide-react';

export default function Sidebar() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `group relative p-3 rounded-lg flex items-center gap-3 transition-all overflow-hidden ${
      isActive 
        ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/20" 
        : "text-gray-400 hover:bg-slate-800/50 hover:text-cyan-300 border border-transparent"
    }`;

  return (
    <aside className="w-64 bg-slate-900/95 backdrop-blur-xl border-r border-cyan-500/20 p-4 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none"></div>
      
      {/* Animated Scan Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 animate-scan-horizontal"></div>

      <div className="relative z-10 mb-6">
        {/* Logo Section */}
        <div className="mb-6 p-4 bg-slate-800/50 border border-cyan-500/30 rounded-xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/50">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                  UFDR
                </div>
                <div className="text-xs text-cyan-400 font-mono">Forensics</div>
              </div>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-cyan-400 font-mono">v0.1</span>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 px-3">
            <Zap className="w-3 h-3 text-cyan-400" />
            <div className="text-xs text-cyan-400 font-mono font-semibold uppercase tracking-wider">
              Navigation
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
          </div>
          
          <nav className="flex flex-col gap-2">
            <NavLink to="/" className={navLinkClass} end>
              {({ isActive }) => (
                <>
                  <Home className="w-5 h-5 relative z-10" />
                  <span className="relative z-10 flex-1">Home</span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-cyan-400 animate-pulse" />
                  )}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse"></div>
                  )}
                </>
              )}
            </NavLink>

            <NavLink to="/cases" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <Database className="w-5 h-5 relative z-10" />
                  <span className="relative z-10 flex-1">Cases</span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-cyan-400 animate-pulse" />
                  )}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse"></div>
                  )}
                </>
              )}
            </NavLink>
            
            <NavLink to="/graph" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <Network className="w-5 h-5 relative z-10" />
                  <span className="relative z-10 flex-1">Graph Explorer</span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-cyan-400 animate-pulse" />
                  )}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse"></div>
                  )}
                </>
              )}
            </NavLink>

            <NavLink to="/reports" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <FileText className="w-5 h-5 relative z-10" />
                  <span className="relative z-10 flex-1">Reports</span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-cyan-400 animate-pulse" />
                  )}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse"></div>
                  )}
                </>
              )}
            </NavLink>

            <NavLink to="/admin" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <Settings className="w-5 h-5 relative z-10" />
                  <span className="relative z-10 flex-1">Admin</span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-cyan-400 animate-pulse" />
                  )}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse"></div>
                  )}
                </>
              )}
            </NavLink>
          </nav>
        </div>

        {/* Saved Filters Section */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-3">
            <Shield className="w-3 h-3 text-purple-400" />
            <div className="text-xs text-purple-400 font-mono font-semibold uppercase tracking-wider">
              Quick Access
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent"></div>
          </div>
          
          <div className="space-y-2">
            <button className="w-full group p-3 text-left rounded-lg text-gray-400 hover:bg-slate-800/50 hover:text-cyan-300 transition-all flex items-center gap-3 border border-transparent hover:border-cyan-500/20">
              <div className="p-1 bg-yellow-500/10 rounded group-hover:bg-yellow-500/20 transition-colors">
                <Clock className="w-4 h-4 text-yellow-400" />
              </div>
              <span className="text-sm flex-1">Recent Alerts</span>
              <div className="px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/30 rounded text-xs text-yellow-400 font-mono">
                3
              </div>
            </button>
            
            <button className="w-full group p-3 text-left rounded-lg text-gray-400 hover:bg-slate-800/50 hover:text-cyan-300 transition-all flex items-center gap-3 border border-transparent hover:border-cyan-500/20">
              <div className="p-1 bg-red-500/10 rounded group-hover:bg-red-500/20 transition-colors">
                <AlertTriangle className="w-4 h-4 text-red-400" />
              </div>
              <span className="text-sm flex-1">High Priority</span>
              <div className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400 font-mono">
                7
              </div>
            </button>
          </div>
        </div>

        {/* Demo Button */}
        <div className="mt-6">
          <button
            onClick={() => {
              sessionStorage.setItem('demoMode', '1');
              window.location.href = '/cases';
            }}
            className="w-full group relative px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Run Demo</span>
            </div>
          </button>
        </div>
      </div>

      {/* Status Footer */}
      <div className="relative z-10 mt-6 pt-4 border-t border-cyan-500/20">
        <div className="flex items-center justify-between px-3 py-2 bg-slate-800/30 rounded-lg border border-cyan-500/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400 font-mono">System Online</span>
          </div>
          <Shield className="w-4 h-4 text-cyan-400" />
        </div>
      </div>

      <style>{`
        @keyframes scan-horizontal {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-scan-horizontal {
          animation: scan-horizontal 3s linear infinite;
        }
      `}</style>
    </aside>
  );
}