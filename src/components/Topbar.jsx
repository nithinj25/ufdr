import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import SearchBar from "./SearchBar";
import Toast from './Toast';
import { client } from '../lib/api';

export default function Topbar() {
  const [q, setQ] = useState("");
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  return (
		<header className="relative flex items-center justify-between gap-4 p-3 px-4 bg-slate-900/80 backdrop-blur-xl border-b border-cyan-500/20 sticky top-0 z-50 overflow-hidden">
			{/* Subtle background grid like Landing */}
			<div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(79,79,79,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(79,79,79,0.18)_1px,transparent_1px)] [background-size:64px_64px]"></div>
			{/* Cyan scan line */}
			<div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 animate-[scan_6s_linear_infinite]"></div>
      <div className="flex items-center gap-3">
				<Link to="/" className="flex items-center gap-3">
					<Home className="w-6 h-6 text-cyan-400" />
					<div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">UFDR</div>
        </Link>
				<div className="hidden md:block text-xs font-mono text-cyan-300">Forensic analysis</div>
      </div>

      <div className="flex-1 max-w-2xl">
        <SearchBar onSearch={(s) => { setQ(s); if (s?.trim()) navigate(`/cases?q=${encodeURIComponent(s)}`); }} />
      </div>

      <div className="flex items-center gap-3">
				<button className="px-3 py-2 text-cyan-300 rounded hover:bg-slate-800/60">🔔</button>
        <button
          onClick={async () => {
            setToast('Running demo...');
            try {
              const res = await client.runDemo();
              setToast(res.message || 'Demo complete');
              // mark demo mode in session so Cases page can show the demo banner
              sessionStorage.setItem('demoMode', '1');
              navigate('/cases');
            } catch (e) {
              setToast('Demo failed');
            }
          }}
					className="px-3 py-2 rounded text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-colors"
        >
          Run Demo
        </button>
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm text-cyan-200">NJ</div>
					<div className="text-sm text-gray-200">Nithin</div>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
			<style>{`
			@keyframes scan {
			  0% { transform: translateX(-100%); }
			  100% { transform: translateX(100%); }
			}
			`}</style>
    </header>
  );
}
