
import {
  Activity,
  ArrowUpRight,
  Database,
  Globe,
  History,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";

const capabilities = [
  {
    title: "URL Intelligence",
    description:
      "Analyze suspicious website addresses and identify potential brand impersonation indicators.",
    icon: Globe,
  },
  {
    title: "Visual Inspection",
    description:
      "Prepare and inspect visual content for future logo and brand similarity analysis.",
    icon: ScanSearch,
  },
  {
    title: "Scan History",
    description:
      "Review previously analyzed items once persistent scan storage is integrated.",
    icon: History,
  },
];

const integrations = [
  { name: "React Frontend", status: "Ready", ready: true },
  { name: "FastAPI Integration", status: "Pending", ready: false },
  { name: "PostgreSQL Database", status: "Pending", ready: false },
  { name: "AI Detection Models", status: "Planned", ready: false },
];

export default function Dashboard() {
  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm font-medium text-[#7555e8]">
          Security Overview
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#242137]">
          Welcome to your workspace
        </h1>
        <p className="mt-2 text-sm text-[#77738a]">
          Manage and explore your brand protection capabilities.
        </p>
      </div>

      <section className="relative overflow-hidden rounded-3xl border border-[#e5defb] bg-[#ede8ff] p-7 md:p-9">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-1.5 text-xs font-semibold text-[#7555e8]">
            <ShieldCheck size={15} />
            AI-Powered Brand Protection
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-[#242137] md:text-3xl">
            A smarter workspace for digital brand security
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#625b78]">
            LankaBrandShield AI is being developed to support
            suspicious URL analysis, visual brand inspection,
            and impersonation risk assessment.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#dcd2fa] bg-white px-4 py-2.5 text-sm font-medium text-[#7555e8]">
            <Activity size={17} />
            Platform under development
          </div>
        </div>

        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#d9ceff] opacity-60 blur-3xl" />
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#242137]">
              Platform Modules
            </h2>
            <p className="mt-1 text-sm text-[#77738a]">
              Core capabilities planned for the platform.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group rounded-2xl border border-[#e9e6f0] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-xl bg-[#ede8ff] p-3">
                    <Icon size={23} className="text-[#7555e8]" />
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-[#aaa5b7] transition-colors group-hover:text-[#7555e8]"
                  />
                </div>

                <h3 className="mt-6 text-lg font-semibold text-[#242137]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#77738a]">
                  {item.description}
                </p>

                <div className="mt-6 border-t border-[#f0edf5] pt-4">
                  <span className="rounded-full bg-[#f4f1ff] px-3 py-1 text-xs font-medium text-[#7555e8]">
                    In Development
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-2">
        <section className="rounded-2xl border border-[#e9e6f0] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#f4f1ff] p-3">
              <Activity size={20} className="text-[#7555e8]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#242137]">
                Recent Activity
              </h2>
              <p className="text-xs text-[#77738a]">
                Latest platform scan activity
              </p>
            </div>
          </div>

          <div className="mt-6 flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-[#e9e6f0] bg-[#fcfbfe] p-6 text-center">
            <History size={28} className="text-[#b4a7e7]" />
            <p className="mt-3 text-sm font-medium text-[#242137]">
              No scan activity yet
            </p>
            <p className="mt-2 text-xs text-[#77738a]">
              Scan records will appear here after backend integration.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-[#e9e6f0] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#f4f1ff] p-3">
              <Database size={20} className="text-[#7555e8]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#242137]">
                System Integration
              </h2>
              <p className="text-xs text-[#77738a]">
                Current development progress
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {integrations.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-3 rounded-xl bg-[#f8f7fc] px-4 py-3"
              >
                <span className="text-sm font-medium text-[#393448]">
                  {item.name}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    item.ready
                      ? "bg-[#e8f7ed] text-[#267347]"
                      : "bg-[#f0edf5] text-[#77738a]"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
