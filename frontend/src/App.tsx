
import { useState } from "react";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <MainLayout
      activePage={activePage}
      onNavigate={setActivePage}
    >
      {activePage === "Dashboard" ? (
        <Dashboard />
      ) : (
        <section className="rounded-2xl border border-slate-800 bg-[#111c2d] p-8">
          <h1 className="text-2xl font-semibold text-white">
            {activePage}
          </h1>

          <p className="mt-3 text-slate-400">
            This module is currently under development.
            Its functionality will be integrated in a future session.
          </p>
        </section>
      )}
    </MainLayout>
  );
}

export default App;
