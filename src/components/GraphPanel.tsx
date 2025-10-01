import { useEffect, useRef, useState } from "react";
import type { CaseItem } from "../types";
import cytoscape from "cytoscape";
import { useNavigate } from "react-router-dom";

export default function GraphPanel({ caseData }: { caseData?: CaseItem }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);
  const navigate = useNavigate();
  const [layoutName, setLayoutName] = useState<'concentric' | 'cose' | 'breadthfirst'>('concentric');

  useEffect(() => {
    if (!containerRef.current || !caseData) return;

    // Initialize cytoscape
    cyRef.current = cytoscape({
      container: containerRef.current,
      elements: {
        nodes: [
          // Case node
          {
            data: { 
              id: caseData.id,
              label: caseData.title,
              type: 'case'
            }
          },
          // Evidence nodes
          ...(caseData.evidences?.map(evidence => ({
            data: {
              id: evidence.id,
              label: evidence.type,
              type: 'evidence',
              parent: caseData.id
            }
          })) || []),
          // Suspect nodes
          ...(caseData.suspects?.map((suspect, idx) => ({
            data: {
              id: `suspect-${idx}`,
              label: suspect,
              type: 'suspect'
            }
          })) || [])
        ],
        edges: [
          // Connect evidences to case
          ...(caseData.evidences?.map(evidence => ({
            data: {
              source: caseData.id,
              target: evidence.id
            }
          })) || []),
          // Connect suspects to case
          ...(caseData.suspects?.map((_, idx) => ({
            data: {
              source: caseData.id,
              target: `suspect-${idx}`
            }
          })) || [])
        ]
      },
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'text-valign': 'center',
            'text-halign': 'center',
            'width': 36,
            'height': 36,
            'font-size': '10px',
            'color': '#e5e7eb',
            'text-outline-width': 2,
            'text-outline-color': 'rgba(2,6,23,0.6)',
            'overlay-padding': 4,
            'overlay-color': 'transparent'
          }
        },
        {
          selector: 'node[type="case"]',
          style: {
            'background-color': '#22d3ee',
            'border-width': 2,
            'border-color': '#06b6d4',
            'width': 48,
            'height': 48,
            'shape': 'round-rectangle'
          }
        },
        {
          selector: 'node[type="evidence"]',
          style: {
            'background-color': '#a78bfa',
            'border-width': 1,
            'border-color': '#8b5cf6',
            'shape': 'ellipse'
          }
        },
        {
          selector: 'node[type="suspect"]',
          style: {
            'background-color': '#f472b6',
            'border-width': 1,
            'border-color': '#ec4899',
            'shape': 'hexagon'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': 'rgba(34,211,238,0.35)',
            'curve-style': 'bezier',
            'target-arrow-shape': 'none'
          }
        },
        {
          selector: 'node:hover',
          style: {
            'border-width': 3,
            'border-color': '#67e8f9'
          }
        }
      ],
      layout: {
        name: layoutName,
        concentric: function(node: any) {
          return node.data('type') === 'case' ? 2 : 1;
        },
        levelWidth: function() { return 1; },
        minNodeSpacing: 50,
        animate: true
      }
    });

    // Add click handlers
    cyRef.current.on('tap', 'node', function(evt) {
      const node = evt.target;
      if (node.data('type') === 'case') {
        navigate(`/cases/${node.id()}`);
      }
    });

    // Cleanup
    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
    };
  }, [caseData, navigate, layoutName]);

  const runLayout = (name: 'concentric' | 'cose' | 'breadthfirst') => {
    setLayoutName(name);
    if (cyRef.current) {
      cyRef.current.layout({ name, animate: true, minNodeSpacing: 50 }).run();
    }
  };

  const fitGraph = () => {
    if (cyRef.current) {
      cyRef.current.fit(undefined, 40);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-white">Interconnectivity Graph</h4>
        <div className="flex items-center gap-2">
          <button onClick={() => runLayout('concentric')} className={`px-2 py-1 text-xs rounded border ${layoutName==='concentric' ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-900/50 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/10'}`}>Concentric</button>
          <button onClick={() => runLayout('cose')} className={`px-2 py-1 text-xs rounded border ${layoutName==='cose' ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-900/50 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/10'}`}>COSE</button>
          <button onClick={() => runLayout('breadthfirst')} className={`px-2 py-1 text-xs rounded border ${layoutName==='breadthfirst' ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-900/50 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/10'}`}>Breadth</button>
          <button onClick={fitGraph} className="px-2 py-1 text-xs rounded border bg-slate-900/50 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/10">Fit</button>
        </div>
      </div>
      <div ref={containerRef} className="h-80 md:h-96 rounded border border-cyan-500/20 bg-slate-950/30" />
      <div className="mt-3 text-xs text-gray-300">
        <span className="inline-flex items-center mr-3">
          <span className="w-3 h-3 rounded-full bg-cyan-400 mr-1"></span>
          Case
        </span>
        <span className="inline-flex items-center mr-3">
          <span className="w-3 h-3 rounded-full bg-purple-400 mr-1"></span>
          Evidence
        </span>
        <span className="inline-flex items-center">
          <span className="w-3 h-3 rounded-full bg-pink-400 mr-1"></span>
          Suspect
        </span>
      </div>
    </div>
  );
}
