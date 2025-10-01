import CaseCard from "./CaseCard";
import type { CaseItem } from "../types";

export default function CaseList({ items }: { items: CaseItem[] }) {
  if (!items?.length) return <div className="text-gray-400">No cases yet.</div>;
  return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map(c => <CaseCard key={c.id} data={c} />)}
    </div>
  );
}
