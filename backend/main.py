
from io import BytesIO

from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from PIL import Image, UnidentifiedImageError

from src.image_preprocessing import preprocess_image
from src.url_analysis import analyze_url


app = FastAPI(
    title="LankaBrandShield AI API",
    description="Backend API for URL intelligence and brand protection research.",
    version="0.1.0",
)

# Allow the local React development server.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


# Image upload configuration
MAX_UPLOAD_BYTES = 5 * 1024 * 1024  # 5 MB
ALLOWED_IMAGE_FORMATS = {"PNG", "JPEG"}


class URLAnalysisRequest(BaseModel):
    url: str = Field(min_length=1, max_length=2048)


@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "LankaBrandShield AI API",
    }


@app.post("/api/analyze-url")
def analyze_url_endpoint(request: URLAnalysisRequest):
    try:
        result = analyze_url(request.url)
    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        ) from exc

    return {
        "url": request.url,
        "analysis": result,
        "message": (
            "URL characteristics extracted successfully. "
            "This result does not determine whether the website is malicious."
        ),
    }


@app.post("/api/preprocess-image")
async def preprocess_image_endpoint(file: UploadFile = File(...)):
    try:
        if file.content_type not in {"image/png", "image/jpeg"}:
            raise HTTPException(
                status_code=400,
                detail="Only PNG and JPEG images are supported.",
            )

        contents = await file.read(MAX_UPLOAD_BYTES + 1)

        if len(contents) > MAX_UPLOAD_BYTES:
            raise HTTPException(
                status_code=413,
                detail="Image exceeds the 5 MB upload limit.",
            )

        try:
            with Image.open(BytesIO(contents)) as image:
                if image.format not in ALLOWED_IMAGE_FORMATS:
                    raise HTTPException(
                        status_code=400,
                        detail="Invalid image format.",
                    )

                original_width, original_height = image.size
                processed = preprocess_image(image)

                return {
                    "filename": file.filename,
                    "original_width": original_width,
                    "original_height": original_height,
                    "processed_width": processed.width,
                    "processed_height": processed.height,
                    "processed_mode": processed.mode,
                    "message": (
                        "Image preprocessing completed successfully."
                    ),
                }

        except (UnidentifiedImageError, OSError, ValueError) as exc:
            raise HTTPException(
                status_code=400,
                detail="Unable to process the uploaded image.",
            ) from exc

    finally:
        await file.close()
