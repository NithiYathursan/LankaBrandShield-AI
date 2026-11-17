
import { useEffect, useState } from "react";
import { Building2, RefreshCw, ShieldCheck } from "lucide-react";
import { getBrands, type Brand } from "../services/brandRegistry";

export default function BrandRegistry() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadBrands() {
    setLoading(true);
    setError("");

    try {
      const data = await getBrands();
      setBrands(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load brands."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    getBrands()
      .then((data) => {
        if (!cancelled) setBrands(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Unable to load brands."
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#242137]">
            Brand Registry
          </h1>
          <p className="mt-2 text-sm text-[#77738a]">
            View registered brands and their verification status.
          </p>
        </div>

        <button
          type="button"
          onClick={loadBrands}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl border border-[#e9e6f0] bg-white px-4 py-2 text-sm font-medium text-[#6d52bb] disabled:opacity-50"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <div className="rounded-2xl border border-[#e9e6f0] bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-[#8065cf]" size={24} />
          <div>
            <h2 className="font-semibold text-[#242137]">
              Registered Brands
            </h2>
            <p className="text-sm text-[#77738a]">
              {brands.length} brand records
            </p>
          </div>
        </div>

        {loading ? (
          <p className="mt-8 text-sm text-[#77738a]">
            Loading brand registry...
          </p>
        ) : error ? (
          <p role="alert" className="mt-8 text-sm text-red-600">
            {error}
          </p>
        ) : brands.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-[#ddd5f2] bg-[#faf8ff] p-10 text-center">
            <Building2
              size={36}
              className="mx-auto text-[#9278d3]"
            />
            <h3 className="mt-4 font-semibold text-[#242137]">
              No brands registered yet
            </h3>
            <p className="mt-2 text-sm text-[#77738a]">
              Brand records will appear here once they are added
              to the PostgreSQL registry.
            </p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#e9e6f0] text-[#77738a]">
                <tr>
                  <th className="px-3 py-3">Brand</th>
                  <th className="px-3 py-3">Official Domain</th>
                  <th className="px-3 py-3">Industry</th>
                  <th className="px-3 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand) => (
                  <tr
                    key={brand.id}
                    className="border-b border-[#f0edf6]"
                  >
                    <td className="px-3 py-4 font-medium text-[#242137]">
                      {brand.brand_name}
                    </td>
                    <td className="px-3 py-4 text-[#6d52bb]">
                      {brand.official_domain}
                    </td>
                    <td className="px-3 py-4 text-[#77738a]">
                      {brand.industry ?? "Not specified"}
                    </td>
                    <td className="px-3 py-4">
                      <span className="rounded-full bg-[#f2edff] px-3 py-1 text-xs font-medium capitalize text-[#6d52bb]">
                        {brand.verification_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
