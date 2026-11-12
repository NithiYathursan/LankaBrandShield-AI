
from io import BytesIO

from fastapi.testclient import TestClient
from PIL import Image

from backend.main import app


client = TestClient(app)


def create_test_image(
    width=800,
    height=600,
    mode="RGB",
    image_format="PNG",
):
    image = Image.new(mode, (width, height), "white")
    buffer = BytesIO()
    image.save(buffer, format=image_format)
    return buffer.getvalue()


def upload_image(filename, content, content_type):
    return client.post(
        "/api/preprocess-image",
        files={
            "file": (filename, content, content_type)
        },
    )


def test_valid_png_upload():
    content = create_test_image()

    response = upload_image(
        "screenshot.png", content, "image/png"
    )

    assert response.status_code == 200

    data = response.json()

    assert data["original_width"] == 800
    assert data["original_height"] == 600
    assert data["processed_width"] == 800
    assert data["processed_height"] == 600
    assert data["processed_mode"] == "RGB"


def test_large_image_resizing():
    content = create_test_image(1920, 1080)

    response = upload_image(
        "large.png", content, "image/png"
    )

    assert response.status_code == 200

    data = response.json()

    assert data["processed_width"] == 1200
    assert data["processed_height"] == 675


def test_valid_jpeg_upload():
    content = create_test_image(
        image_format="JPEG"
    )

    response = upload_image(
        "screenshot.jpg", content, "image/jpeg"
    )

    assert response.status_code == 200
    assert response.json()["processed_mode"] == "RGB"


def test_unsupported_file_type():
    response = upload_image(
        "document.txt",
        b"Hello World",
        "text/plain",
    )

    assert response.status_code == 400


def test_corrupted_image():
    response = upload_image(
        "corrupted.png",
        b"Not a real PNG image",
        "image/png",
    )

    assert response.status_code == 400


def test_oversized_image():
    content = b"x" * (5 * 1024 * 1024 + 1)

    response = upload_image(
        "large.png",
        content,
        "image/png",
    )

    assert response.status_code == 413


def test_missing_file():
    response = client.post(
        "/api/preprocess-image"
    )

    assert response.status_code == 422


def test_image_content_type_mismatch():
    content = create_test_image(
        image_format="JPEG"
    )

    response = upload_image(
        "fake.png",
        content,
        "image/png",
    )

    # Current endpoint validates the actual image format,
    # but does not require MIME type to match image format.
    assert response.status_code == 200
