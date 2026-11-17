
export interface Brand {
  id: number;
  brand_name: string;
  official_domain: string;
  industry: string | null;
  country_code: string;
  logo_path: string | null;
  verification_status: "pending" | "verified" | "rejected";
  verification_source: string | null;
  created_at: string;
  updated_at: string;
}

interface BrandRegistryResponse {
  brands: Brand[];
}

export async function getBrands(): Promise<Brand[]> {
  const response = await fetch("http://127.0.0.1:8000/api/brands");

  if (!response.ok) {
    throw new Error("Failed to load the brand registry.");
  }

  const data = (await response.json()) as BrandRegistryResponse;
  return data.brands;
}
