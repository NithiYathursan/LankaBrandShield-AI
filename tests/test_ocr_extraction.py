
from unittest.mock import patch

import pytest
from PIL import Image

from src.ocr_extraction import extract_text


def test_english_text_extraction():
    image = Image.new("RGB", (800, 400), "white")

    with patch(
        "src.ocr_extraction.pytesseract.image_to_string",
        return_value="Welcome to LankaBrandShield",
    ) as mock_ocr:
        result = extract_text(image, languages="eng")

    assert result["text"] == "Welcome to LankaBrandShield"
    assert result["languages"] == "eng"
    assert result["character_count"] == len(result["text"])
    mock_ocr.assert_called_once()


def test_sinhala_language_selection():
    image = Image.new("RGB", (800, 400), "white")

    with patch(
        "src.ocr_extraction.pytesseract.image_to_string",
        return_value="Sinhala sample",
    ) as mock_ocr:
        result = extract_text(image, languages="sin")

    assert result["languages"] == "sin"
    assert mock_ocr.call_args.kwargs["lang"] == "sin"


def test_tamil_language_selection():
    image = Image.new("RGB", (800, 400), "white")

    with patch(
        "src.ocr_extraction.pytesseract.image_to_string",
        return_value="Tamil sample",
    ) as mock_ocr:
        result = extract_text(image, languages="tam")

    assert result["languages"] == "tam"
    assert mock_ocr.call_args.kwargs["lang"] == "tam"


def test_multilingual_language_selection():
    image = Image.new("RGB", (800, 400), "white")

    with patch(
        "src.ocr_extraction.pytesseract.image_to_string",
        return_value="Multilingual sample",
    ) as mock_ocr:
        result = extract_text(image, languages="eng+sin+tam")

    assert result["languages"] == "eng+sin+tam"
    assert mock_ocr.call_args.kwargs["lang"] == "eng+sin+tam"


def test_unsupported_language():
    image = Image.new("RGB", (800, 400), "white")

    with pytest.raises(ValueError):
        extract_text(image, languages="fra")


def test_empty_language():
    image = Image.new("RGB", (800, 400), "white")

    with pytest.raises(ValueError):
        extract_text(image, languages="")


def test_whitespace_is_removed():
    image = Image.new("RGB", (800, 400), "white")

    with patch(
        "src.ocr_extraction.pytesseract.image_to_string",
        return_value="  Sample text \n",
    ):
        result = extract_text(image)

    assert result["text"] == "Sample text"
    assert result["character_count"] == 11


def test_image_preprocessing():
    image = Image.new("RGBA", (1920, 1080), "white")

    with patch(
        "src.ocr_extraction.pytesseract.image_to_string",
        return_value="Test",
    ) as mock_ocr:
        extract_text(image)

    processed_image = mock_ocr.call_args.args[0]

    assert processed_image.mode == "RGB"
    assert processed_image.size == (1200, 675)
