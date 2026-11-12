
import { useState, type FormEvent } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Globe,
  Loader2,
  Search,
  ShieldCheck,
} from "lucide-react";

import {
  analyzeURL,
  type URLAnalysisResponse,
} from "../services/urlAnalysis";

export default function URLIntelligence() {
  const [url, setUrl] = useState("");
  const [result, setResult] =
    useState<URLAnalysisResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setResult(null);

    const trimmedURL = url.trim();

    if (!trimmedURL) {
      setError("Please enter a website URL.");
      return;
    }

    if (!trimmedURL.toLowerCase().startsWith("https://")) {
      setError("Please enter a valid HTTPS URL.");
      return;
    }

    setLoading(true);

    try {
      const data = await analyzeURL(trimmedURL);
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm font-medium text-[#7555e8]">
          URL Intelligence
        </p>
        <h1 className="mt-2 text-3xl font-bold text-[#242137]">
          Website URL Analysis
        </h1>
        <p className="mt-2 text-sm text-[#77738a]">
          Extract URL characteristics using the FastAPI backend.
        </p>
      </div>

      <section className="rounded-2xl border border-[#e9e6f0] bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-[#ede8ff] p-3">
            <Globe size={23} className="text-[#7555e8]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#242137]">
              Analyze a Website URL
            </h2>
            <p className="text-sm text-[#77738a]">
              HTTPS addresses only
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label
            htmlFor="website-url"
            className="block text-sm font-medium text-[#393448]"
          >
            Website URL
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="website-url"
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://www.example.com"
              required
              maxLength={2048}
              disabled={loading}
              className="min-w-0 flex-1 rounded-xl border border-[#e9e6f0] bg-[#fcfbfe] px-4 py-3 text-sm text-[#242137] outline-none transition focus:border-[#7555e8] focus:ring-2 focus:ring-[#ede8ff]"
            />

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7555e8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#6243d2] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Search size={18} />
              )}
              {loading ? "Analyzing..." : "Analyze URL"}
            </button>
          </div>
        </form>

        {error && (
          <div
            role="alert"
            className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <AlertCircle size={19} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </section>

      {result && (
        <section className="rounded-2xl border border-[#e9e6f0] bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <CheckCircle2 size={23} className="text-[#7555e8]" />
            <h2 className="text-xl font-semibold text-[#242137]">
              URL Analysis Results
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Domain", result.analysis.domain],
              ["Domain Length", result.analysis.domain_length],
              [
                "IP Address",
                result.analysis.is_ip_address ? "Yes" : "No",
              ],
              ["Hyphen Count", result.analysis.hyphen_count],
              ["Subdomain Count", result.analysis.subdomain_count],
            ].map(([label, value]) => (
              <div
                key={String(label)}
                className="min-w-0 rounded-xl border border-[#e9e6f0] bg-[#f8f7fc] p-5"
              >
                <p className="text-xs font-medium text-[#77738a]">
                  {label}
                </p>
                <p className="mt-3 break-words text-lg font-semibold text-[#242137]">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#f4f1ff] p-4 text-sm leading-6 text-[#625b78]">
            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-[#7555e8]"
            />
            <p>{result.message}</p>
          </div>
        </section>
      )}
    </div>
  );
}
