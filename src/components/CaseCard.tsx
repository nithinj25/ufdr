import { useState } from "react";
import { Link } from "react-router-dom";
import type { CaseItem } from "../types";

export default function CaseCard({ data }: { data: CaseItem }) {
  const [open, setOpen] = useState(false);
  return (
		<div className="bg-slate-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-5 h-full flex flex-col justify-between shadow-xl hover:shadow-cyan-500/20 transition-all">
      <div>
				<div className="flex justify-between items-start">
					<h3 className="text-lg font-semibold text-white">{data.title}</h3>
					<span className="text-xs text-cyan-300 font-mono">{new Date(data.createdAt).toLocaleDateString()}</span>
        </div>
				<p className="text-sm text-gray-300 mt-2">{data.description}</p>

				<div className="mt-3 flex flex-wrap gap-2">
          {(data.evidences || []).slice(0,3).map(ev => (
						<span key={ev.id} className="text-xs px-2 py-1 rounded bg-slate-900/50 border border-cyan-500/20 text-cyan-300">{ev.type}</span>
          ))}
					{data.evidences && data.evidences.length > 3 && <span className="text-xs text-gray-400">+{data.evidences.length - 3} more</span>}
        </div>
      </div>

			<div className="mt-4 flex items-center justify-between">
				<div className="text-sm text-gray-300">Suspects: {data.suspects?.length || 0}</div>
        <div className="flex gap-2">
					<Link to={`/cases/${data.id}`} className="px-3 py-1 rounded bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500">Open</Link>
					<button onClick={() => setOpen(true)} className="px-3 py-1 rounded bg-slate-900/50 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/10">Quick view</button>
        </div>
      </div>

      {open && (
				<div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
					<div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-6 w-11/12 md:w-2/3 shadow-2xl">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-lg font-semibold text-white">{data.title}</h3>
							<button onClick={() => setOpen(false)} className="text-cyan-300 hover:text-white">Close</button>
						</div>
						<div className="text-sm text-gray-300">{data.description}</div>
						<div className="mt-4">
							<h4 className="text-sm font-medium text-cyan-300">Evidences</h4>
							<ul className="mt-2 space-y-2 text-sm">
								{(data.evidences || []).map(ev => (
									<li key={ev.id} className="border border-cyan-500/20 rounded p-2 text-gray-200 bg-slate-900/50">{ev.type}: {ev.snippet}</li>
								))}
							</ul>
						</div>
					</div>
				</div>
      )}
    </div>
  );
}
