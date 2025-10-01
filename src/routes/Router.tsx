import { Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Cases from "../pages/Cases";
import CaseDetail from "../pages/CaseDetail";
import Evidence from "../pages/Evidence";
import GraphExplorer from "../pages/GraphExplorer";
import Reports from "../pages/Reports";
import Admin from "../pages/Admin";
import Landing from "../pages/Landing";

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<App />}>
  <Route index element={<Landing />} />
        <Route path="cases" element={<Cases />} />
        <Route path="cases/:caseId" element={<CaseDetail />} />
        <Route path="evidence/:evidenceId" element={<Evidence />} />
        <Route path="graph" element={<GraphExplorer />} />
        <Route path="reports" element={<Reports />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}
