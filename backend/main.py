
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

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
