import { Link } from 'react-router-dom';
import { Shield, Database, Users, Activity, Lock, Zap, Eye, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Landing() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);

    const scanInterval = setInterval(() => {
      setScanProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 50);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(scanInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] opacity-20"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      
      {/* Scan Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 animate-scan"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-7xl w-full">
          {/* Header Section */}
          <div className="text-center mb-12 relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6 backdrop-blur-sm">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-mono">SYSTEM ACTIVE</span>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
            
            <h1 className={`text-6xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 ${glitchActive ? 'animate-glitch' : ''}`}>
              UFDR
            </h1>
            <div className="text-2xl font-mono text-cyan-300 mb-2 tracking-widest">
              UNIFIED FORENSIC DATA REPOSITORY
            </div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Advanced threat intelligence platform for forensic case exploration, 
              inter-device graph analysis, and automated investigation reporting
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Left Card - Actions */}
            <div className="bg-slate-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-500 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/50">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Forensic Explorer</h3>
                  <p className="text-cyan-400 text-sm font-mono">ACCESS LEVEL: AUTHORIZED</p>
                </div>
              </div>
              
              <p className="text-gray-400 mb-8 leading-relaxed">
                Dive deep into extracted evidence, analyze connection patterns, and uncover hidden relationships 
                across multiple devices and data sources with real-time visualization.
              </p>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link 
                  to="/cases" 
                  className="group/btn relative px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    <Database className="w-5 h-5" />
                    <span>Explore Cases</span>
                  </div>
                </Link>
                
                <Link 
                  to="/graph" 
                  className="group/btn relative px-6 py-4 bg-slate-700/50 border-2 border-purple-500/50 text-purple-300 rounded-xl font-semibold hover:bg-purple-500/20 hover:border-purple-400 hover:scale-105 transition-all duration-300"
                >
                  <div className="relative flex items-center justify-center gap-2">
                    <Activity className="w-5 h-5" />
                    <span>Graph Explorer</span>
                  </div>
                </Link>
              </div>

              {/* Scan Progress */}
              <div className="mt-8 p-4 bg-slate-900/50 rounded-lg border border-cyan-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-cyan-400">SYSTEM SCAN</span>
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

            {/* Right Card - Stats */}
            <div className="bg-slate-800/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 shadow-2xl shadow-purple-500/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Intelligence Dashboard</h3>
                <Eye className="w-6 h-6 text-purple-400 animate-pulse" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-4 hover:scale-105 transition-transform duration-300 cursor-pointer group/stat">
                  <div className="flex flex-col items-center text-center">
                    <Database className="w-8 h-8 text-blue-400 mb-2 group-hover/stat:animate-bounce" />
                    <div className="text-3xl font-bold text-white mb-1">2</div>
                    <div className="text-xs text-blue-300 font-mono">ACTIVE CASES</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl p-4 hover:scale-105 transition-transform duration-300 cursor-pointer group/stat">
                  <div className="flex flex-col items-center text-center">
                    <Zap className="w-8 h-8 text-green-400 mb-2 group-hover/stat:animate-bounce" />
                    <div className="text-3xl font-bold text-white mb-1">5</div>
                    <div className="text-xs text-green-300 font-mono">EVIDENCE ITEMS</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/30 rounded-xl p-4 hover:scale-105 transition-transform duration-300 cursor-pointer group/stat">
                  <div className="flex flex-col items-center text-center">
                    <Users className="w-8 h-8 text-red-400 mb-2 group-hover/stat:animate-bounce" />
                    <div className="text-3xl font-bold text-white mb-1">3</div>
                    <div className="text-xs text-red-300 font-mono">SUSPECTS</div>
                  </div>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="bg-slate-900/50 rounded-xl p-4 border border-cyan-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-mono text-cyan-400">RECENT ACTIVITY</span>
                </div>
                <div className="space-y-3">
                  {[
                    { action: 'Case #2847 analyzed', time: '2m ago', color: 'cyan' },
                    { action: 'Evidence uploaded', time: '15m ago', color: 'green' },
                    { action: 'Graph generated', time: '1h ago', color: 'purple' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 bg-${item.color}-400 rounded-full animate-pulse`}></div>
                        <span className="text-gray-300">{item.action}</span>
                      </div>
                      <span className="text-gray-500 text-xs font-mono">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demo Banner */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-purple-300">Demo Mode:</span> Load sample forensic data for quick analysis and testing
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Status Bar */}
          <div className="bg-slate-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-400 font-mono">System Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span className="text-gray-400 font-mono">Encrypted Connection</span>
                </div>
              </div>
              <div className="text-gray-500 font-mono text-xs">
                v2.4.1 | Last sync: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        .animate-glitch {
          animation: glitch 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}