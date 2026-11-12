
export interface ImagePreprocessingResponse {
  filename: string;
  original_width: number;
  original_height: number;
  processed_width: number;
  processed_height: number;
  processed_mode: string;
  message: string;
}

export async function preprocessImage(
  file: File
): Promise<ImagePreprocessingResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    "http://127.0.0.1:8000/api/preprocess-image",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    let message = "Image preprocessing failed.";

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

  return response.json() as Promise<ImagePreprocessingResponse>;
}
