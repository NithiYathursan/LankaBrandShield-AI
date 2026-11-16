
from io import BytesIO
from unittest.mock import patch

from fastapi.testclient import TestClient
from PIL import Image

from backend.main import app


client = TestClient(app)


def create_image():
    image = Image.new("RGB", (800, 400), "white")
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    return buffer.getvalue()


def upload_image(content, languages="eng", content_type="image/png"):
    return client.post(
        "/api/extract-text",
        files={
            "file": ("screenshot.png", content, content_type)
        },
        data={"languages": languages},
    )


def test_valid_english_ocr():
    with patch(
        "backend.main.extract_text",
        return_value={
            "text": "Welcome to LankaBrandShield",
            "languages": "eng",
            "character_count": 27,
        },
    ):
        response = upload_image(create_image())

    assert response.status_code == 200
    assert response.json()["text"] == "Welcome to LankaBrandShield"
    assert response.json()["languages"] == "eng"


def test_tamil_language():
    with patch(
        "backend.main.extract_text",
        return_value={
            "text": "Tamil sample",
            "languages": "tam",
            "character_count": 12,
        },
    ):
        response = upload_image(
            create_image(),
            languages="tam",
        )

    assert response.status_code == 200
    assert response.json()["languages"] == "tam"


def test_sinhala_language():
    with patch(
        "backend.main.extract_text",
        return_value={
            "text": "Sinhala sample",
            "languages": "sin",
            "character_count": 14,
        },
    ):
        response = upload_image(
            create_image(),
            languages="sin",
        )

    assert response.status_code == 200
    assert response.json()["languages"] == "sin"


def test_invalid_language():
    response = upload_image(
        create_image(),
        languages="fra",
    )

    assert response.status_code == 400


def test_invalid_file_type():
    response = upload_image(
        b"hello",
        content_type="text/plain",
    )

    assert response.status_code == 400


def test_corrupted_image():
    response = upload_image(b"not a real image")

    assert response.status_code == 400


def test_oversized_image():
    response = upload_image(
        b"x" * (5 * 1024 * 1024 + 1)
    )

    assert response.status_code == 413


def test_missing_file():
    response = client.post(
        "/api/extract-text",
        data={"languages": "eng"},
    )

    assert response.status_code == 422
