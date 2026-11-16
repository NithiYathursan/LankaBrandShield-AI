
import pytesseract
from PIL import Image

from src.image_preprocessing import preprocess_image


SUPPORTED_LANGUAGES = {"eng", "sin", "tam"}


def extract_text(
    image: Image.Image,
    languages: str = "eng",
) -> dict:
    """
    Extract text from a website screenshot using Tesseract OCR.

    Supported languages:
    - eng: English
    - sin: Sinhala
    - tam: Tamil
    """

    selected_languages = languages.split("+")

    if (
        not selected_languages
        or any(
            language not in SUPPORTED_LANGUAGES
            for language in selected_languages
        )
    ):
        raise ValueError("Unsupported OCR language.")

    processed_image = preprocess_image(image)

    extracted_text = pytesseract.image_to_string(
        processed_image,
        lang=languages,
        config="--psm 3",
    ).strip()

    return {
        "text": extracted_text,
        "languages": languages,
        "character_count": len(extracted_text),
    }
