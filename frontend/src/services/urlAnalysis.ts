
export type URLAnalysis = {
  domain: string;
  domain_length: number;
  is_ip_address: boolean;
  hyphen_count: number;
  subdomain_count: number;
};

export type URLAnalysisResponse = {
  url: string;
  analysis: URLAnalysis;
  message: string;
};

type APIError = {
  detail?: string;
};

const API_BASE_URL = "http://127.0.0.1:8000";

export async function analyzeURL(
  url: string
): Promise<URLAnalysisResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/analyze-url`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    }
  );

  if (!response.ok) {
    const errorData: APIError = await response.json();

    throw new Error(
      typeof errorData.detail === "string"
        ? errorData.detail
        : "Unable to analyze the URL."
    );
  }

  return (await response.json()) as URLAnalysisResponse;
}
