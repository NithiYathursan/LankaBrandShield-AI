
import { useState } from "react";
import {
  FileText,
  ImageUp,
  Languages,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";

import {
  preprocessImage,
  type ImagePreprocessingResponse,
} from "../services/imagePreprocessing";

import {
  extractOCRText,
  type OCRResponse,
} from "../services/ocrExtraction";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const OCR_LANGUAGES = [
  { value: "eng", label: "English" },
  { value: "sin", label: "Sinhala" },
  { value: "tam", label: "Tamil" },
  { value: "eng+sin+tam", label: "English + Sinhala + Tamil" },
];

export default function VisualInspection() {
  const [file, setFile] = useState<File | null>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] =
    useState<ImagePreprocessingResponse | null>(null);

  const [ocrResult, setOcrResult] =
    useState<OCRResponse | null>(null);

  const [languages, setLanguages] = useState("eng");
  const [loading, setLoading] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);

  const [error, setError] = useState("");
  const [ocrError, setOcrError] = useState("");

 function handleFile(selected: File | undefined) {
  // Release the previous preview URL.
  if (preview) {
    URL.revokeObjectURL(preview);
  }

  setFile(null);
  setPreview(null);
  setResult(null);
  setOcrResult(null);
  setError("");
  setOcrError("");

  if (!selected) return;

  if (!["image/png", "image/jpeg"].includes(selected.type)) {
    setError("Please select a PNG or JPEG image.");
    return;
  }

  if (selected.size > MAX_FILE_SIZE) {
    setError("The image must be 5 MB or smaller.");
    return;
  }

  setFile(selected);
  setPreview(URL.createObjectURL(selected));
} 

  
  async function handlePreprocess() {
    if (!file) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await preprocessImage(file);
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to preprocess the image."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleOCR() {
    if (!file) return;

    setOcrLoading(true);
    setOcrError("");
    setOcrResult(null);

    try {
      const data = await extractOCRText(file, languages);
      setOcrResult(data);
    } catch (err) {
      setOcrError(
        err instanceof Error
          ? err.message
          : "Unable to extract text."
      );
    } finally {
      setOcrLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Visual Inspection
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Upload website screenshots for image preprocessing
          and multilingual OCR text extraction.
        </p>
      </div>

      {/* Screenshot upload */}
      <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <ImageUp className="text-violet-600" />

          <h2 className="font-semibold text-slate-800">
            Screenshot Upload
          </h2>
        </div>

        <label className="mt-5 flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-violet-200 bg-violet-50/40 p-8 text-center">
          <ImageUp
            className="mb-3 text-violet-500"
            size={36}
          />

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
            disabled={loading || ocrLoading}
            onChange={(event) => {
              handleFile(event.target.files?.[0]);
              event.target.value = "";
            }}
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
          <p
            role="alert"
            className="mt-4 text-sm text-red-600"
          >
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handlePreprocess}
          disabled={!file || loading || ocrLoading}
          className="mt-5 flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading && (
            <LoaderCircle
              className="animate-spin"
              size={17}
            />
          )}

          {loading
            ? "Processing..."
            : "Preprocess Image"}
        </button>
      </div>

      {/* Preprocessing results */}
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
            Image preprocessing completed successfully.
          </p>
        </div>
      )}

      {/* OCR section */}
      <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Languages className="text-violet-600" />

          <h2 className="font-semibold text-slate-800">
            Multilingual OCR
          </h2>
        </div>

        <p className="mt-3 text-sm text-slate-500">
          Extract visible text from the selected screenshot
          using Tesseract OCR.
        </p>

        <div className="mt-5">
          <label
            htmlFor="ocr-language"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            OCR Language
          </label>

          <select
            id="ocr-language"
            value={languages}
            onChange={(event) => {
              setLanguages(event.target.value);
              setOcrResult(null);
              setOcrError("");
            }}
            disabled={ocrLoading}
            className="w-full rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 sm:max-w-sm"
          >
            {OCR_LANGUAGES.map((language) => (
              <option
                key={language.value}
                value={language.value}
              >
                {language.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleOCR}
          disabled={!file || loading || ocrLoading}
          className="mt-5 flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {ocrLoading ? (
            <LoaderCircle
              className="animate-spin"
              size={17}
            />
          ) : (
            <FileText size={17} />
          )}

          {ocrLoading
            ? "Extracting Text..."
            : "Extract Text"}
        </button>

        {ocrError && (
          <p
            role="alert"
            className="mt-4 text-sm text-red-600"
          >
            {ocrError}
          </p>
        )}
      </div>

      {/* OCR results */}
      {ocrResult && (
        <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <FileText className="text-violet-600" />

            <h2 className="font-semibold text-slate-800">
              Extracted Text
            </h2>
          </div>

          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <ResultCard
              label="OCR Languages"
              value={ocrResult.languages}
            />

            <ResultCard
              label="Character Count"
              value={String(ocrResult.character_count)}
            />
          </div>

          <div className="rounded-xl border border-violet-100 bg-violet-50/40 p-4">
            <p className="mb-3 text-sm font-medium text-slate-700">
              OCR Output
            </p>

            {ocrResult.text ? (
              <pre className="max-h-96 overflow-auto whitespace-pre-wrap break-words font-sans text-sm leading-7 text-slate-700">
                {ocrResult.text}
              </pre>
            ) : (
              <p className="text-sm text-slate-500">
                No readable text was detected.
              </p>
            )}
          </div>

          <p className="mt-4 text-xs text-slate-500">
            OCR output may contain recognition errors.
            Logo detection and brand impersonation
            prediction are not yet implemented.
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
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-2 font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}
