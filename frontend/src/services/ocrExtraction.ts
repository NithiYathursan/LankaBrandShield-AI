
export interface OCRResponse {
  filename: string;
  text: string;
  languages: string;
  character_count: number;
  message: string;
}

export async function extractOCRText(
  file: File,
  languages: string
): Promise<OCRResponse> {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("languages", languages);

  const response = await fetch(
    "http://127.0.0.1:8000/api/extract-text",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    let message = "OCR extraction failed.";

    try {
      const error = await response.json();

      if (typeof error.detail === "string") {
        message = error.detail;
      }
    } catch {
      // Keep the default error message.
    }

    throw new Error(message);
  }

  return (await response.json()) as OCRResponse;
}
