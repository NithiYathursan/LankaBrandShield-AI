import {
  BarChart3,
  Building2,
  Globe,
  History,
  LayoutDashboard,
  ScanSearch,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";

const navigationItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "URL Intelligence", icon: Globe },
  { label: "Visual Inspection", icon: ScanSearch },
  { label: "Scan History", icon: History },
  { label: "Brand Registry", icon: Building2 },
  { label: "Risk Analytics", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

type SidebarProps = {
  activePage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({
  activePage,
  onNavigate,
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-stone-800 bg-[#1c211f] transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-stone-800 px-6 py-7">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-400/10 p-3">
              <ShieldCheck className="h-7 w-7 text-emerald-400" />
            </div>

            <div>
              <h1 className="text-lg font-bold text-white">
                LankaBrandShield
              </h1>
              <p className="text-xs font-medium tracking-widest text-emerald-400">
                AI PLATFORM
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={onClose}
            className="text-slate-400 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav aria-label="Main navigation" className="flex-1 px-4 py-7">
          <p className="mb-4 px-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Workspace
          </p>

          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = activePage === item.label;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    onNavigate(item.label);
                    onClose();
                  }}
                  aria-current={active ? "page" : undefined}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
                    active
                      ? "border border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                      : "text-slate-400 hover:bg-stone-800 hover:text-white"
                  }`}
                >
                  <Icon size={19} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-stone-800 p-5">
          <div className="rounded-xl border border-slate-700 bg-[#252b28] p-4">
            <p className="text-sm font-semibold text-white">
              Development Environment
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Frontend development in progress.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}