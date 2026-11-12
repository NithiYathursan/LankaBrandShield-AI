
import { useState } from "react";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import URLIntelligence from "./pages/URLIntelligence";
function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <MainLayout
      activePage={activePage}
      onNavigate={setActivePage}
    >
      {activePage === "Dashboard" ? (
        <Dashboard />
      )  : activePage === "URL Intelligence" ? (
        <URLIntelligence />): (
        <section className="rounded-2xl border border-[#e9e6f0] bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-[#242137]">
            {activePage}
          </h1>

          <p className="mt-3 text-sm leading-7 text-[#77738a]">
            This module is currently under development.
            Its functionality will be integrated in a future session.
          </p>
        </section>
      )}
    </MainLayout>
  );
}

export default App;
