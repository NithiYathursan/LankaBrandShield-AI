
import { useState, type ReactNode } from "react";
import { Menu, ShieldCheck } from "lucide-react";
import Sidebar from "./Sidebar";

type MainLayoutProps = {
  children: ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
};

export default function MainLayout({
  children,
  activePage,
  onNavigate,
}: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f7fc] text-[#242137]">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:ml-72">
        <header className="sticky top-0 z-20 border-b border-[#e9e6f0] bg-white/95 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between gap-4 px-5 md:px-8">
            <div className="flex items-center gap-4">
              <button
                type="button"
                aria-label="Open navigation"
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg p-2 text-[#77738a] hover:bg-[#f2effb] lg:hidden"
              >
                <Menu size={22} />
              </button>

              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-[#9994a8]">
                  Security Workspace
                </p>

                <h2 className="mt-1 text-lg font-semibold text-[#242137]">
                  {activePage}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-[#e9e6f0] bg-[#f8f7fc] px-3 py-2 text-xs font-medium text-[#625b78]">
              <ShieldCheck size={15} className="text-[#7555e8]" />
              <span>Frontend Ready</span>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
