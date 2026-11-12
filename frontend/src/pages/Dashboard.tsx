
import {
  Activity,
  Database,
  Globe,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";

const capabilities = [
  {
    title: "URL Intelligence",
    description: "Inspect domain structure and URL characteristics.",
    icon: Globe,
    status: "Backend integration pending",
  },
  {
    title: "Visual Inspection",
    description: "Prepare screenshots for future visual analysis.",
    icon: ScanSearch,
    status: "Backend integration pending",
  },
  {
    title: "Scan History",
    description: "Review previous analyses after database integration.",
    icon: Database,
    status: "Database integration pending",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-[#293a31] to-[#1c211f] p-8 md:p-10">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-300">
          <ShieldCheck size={16} />
          SECURITY INTELLIGENCE WORKSPACE
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Brand Protection Intelligence
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
          A developing platform for website URL inspection,
          screenshot preprocessing, and future brand
          impersonation screening.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <span className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950">
            React Frontend Active
          </span>

          <span className="rounded-xl border border-slate-600 px-5 py-3 text-sm text-slate-300">
            API Integration Pending
          </span>
        </div>
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-white">
            Platform Capabilities
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Development modules and planned integrations
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-2xl border border-stone-800 bg-[#252b28] p-6 transition hover:border-emerald-400/30"
              >
                <div className="inline-flex rounded-xl bg-emerald-400/10 p-3 text-emerald-400">
                  <Icon size={24} />
                </div>

                <h3 className="mt-6 text-lg font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 min-h-14 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>

                <div className="mt-5 border-t border-stone-800 pt-4">
                  <p className="text-xs font-medium text-amber-300">
                    {item.status}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <div className="rounded-2xl border border-stone-800 bg-[#252b28] p-7">
          <div className="flex items-center gap-3">
            <Activity size={22} className="text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">
              Recent Activity
            </h3>
          </div>

          <div className="mt-7 rounded-xl border border-dashed border-slate-700 p-10 text-center">
            <p className="font-medium text-slate-300">
              No scan records available
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Activity will appear after backend and database integration.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-stone-800 bg-[#252b28] p-7">
          <h3 className="text-lg font-semibold text-white">
            System Integration
          </h3>

          <div className="mt-7 space-y-4">
            {[
              ["React Frontend", "Ready"],
              ["FastAPI Backend", "Pending"],
              ["PostgreSQL Database", "Pending"],
              ["AI Detection Models", "Planned"],
            ].map(([name, status]) => (
              <div
                key={name}
                className="flex items-center justify-between gap-3 border-b border-stone-800 pb-4 last:border-0"
              >
                <span className="text-sm text-slate-300">
                  {name}
                </span>

                <span
                  className={`text-xs font-semibold ${
                    status === "Ready"
                      ? "text-emerald-400"
                      : "text-amber-300"
                  }`}
                >
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
