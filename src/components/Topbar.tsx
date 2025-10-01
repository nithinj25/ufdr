import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import SearchBar from "./SearchBar";
import Toast from './Toast';
import { client } from '../lib/api';

interface ToastMessage {
  message: string;
  type: 'success' | 'error';
}

export default function Topbar() {
  const [q, setQ] = useState("");
  const [toast, setToast] = useState<ToastMessage | null>(null);
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
          <h1 className="font-[bender] text-xl text-white tracking-wider">UFDR</h1>
        </Link>
      </div>
      <div className="flex-1 max-w-3xl">
        <SearchBar onSearch={query => {
          setQ(query);
          if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
          }
        }} />
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => {
            client.query(q).then(response => {
              setToast({
                message: 'Query processed successfully',
                type: 'success'
              });
            }).catch(error => {
              setToast({
                message: error.message || 'Failed to process query',
                type: 'error'
              });
            });
          }}
          className="px-4 py-2 rounded bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-medium"
        >
          Run Query
        </button>
      </div>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </header>
  );
}