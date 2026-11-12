
import { useEffect, useState } from "react";
import {
  ImageUp,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";
import {
  preprocessImage,
  type ImagePreprocessingResponse,
} from "../services/imagePreprocessing";

export default function VisualInspection() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] =
    useState<ImagePreprocessingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function handleFile(selected: File | undefined) {
    setResult(null);
    setError("");

    if (!selected) return;

    if (
      !["image/png", "image/jpeg"].includes(selected.type)
    ) {
      setError("Please select a PNG or JPEG image.");
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setError("The image must be 5 MB or smaller.");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  async function handleUpload() {
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const data = await preprocessImage(file);
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to process image."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Visual Inspection
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Upload a website screenshot for preprocessing
          and future visual brand analysis.
        </p>
      </div>

      <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <ImageUp className="text-violet-600" />
          <h2 className="font-semibold text-slate-800">
            Screenshot Upload
          </h2>
        </div>

        <label className="mt-5 flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-violet-200 bg-violet-50/40 p-8 text-center">
          <ImageUp className="mb-3 text-violet-500" size={36} />
          <span className="text-sm font-medium text-slate-700">
            Select a website screenshot
          </span>
          <span className="mt-2 text-xs text-slate-500">
            PNG or JPEG · Maximum 5 MB
          </span>
          <input
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={(event) =>
              handleFile(event.target.files?.[0])
            }
          />
        </label>

        {preview && (
          <img
            src={preview}
            alt="Selected screenshot preview"
            className="mt-5 max-h-72 rounded-xl border border-slate-200 object-contain"
          />
        )}

        {file && (
          <p className="mt-3 text-sm text-slate-600">
            Selected: {file.name}
          </p>
        )}

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleUpload}
          disabled={!file || loading}
          className="mt-5 flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading && (
            <LoaderCircle className="animate-spin" size={17} />
          )}
          {loading ? "Processing..." : "Preprocess Image"}
        </button>
      </div>

      {result && (
        <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="text-violet-600" />
            <h2 className="font-semibold text-slate-800">
              Preprocessing Results
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard
              label="Original Size"
              value={`${result.original_width} × ${result.original_height}`}
            />
            <ResultCard
              label="Processed Size"
              value={`${result.processed_width} × ${result.processed_height}`}
            />
            <ResultCard
              label="Color Mode"
              value={result.processed_mode}
            />
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Image preprocessing completed. OCR and logo
            detection are not yet implemented.
          </p>
        </div>
      )}
    </div>
  );
}

function ResultCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-violet-50 p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-2 font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}
