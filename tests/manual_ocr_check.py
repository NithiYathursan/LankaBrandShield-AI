
from PIL import Image, ImageDraw, ImageFont

from src.ocr_extraction import extract_text


def main():
    image = Image.new("RGB", (1000, 300), "white")
    draw = ImageDraw.Draw(image)

    text = "Welcome to LankaBrandShield AI"

    # Use a Windows font for clear text rendering.
    font = ImageFont.truetype(
        "C:/Windows/Fonts/arial.ttf",
        48,
    )

    draw.text(
        (50, 100),
        text,
        fill="black",
        font=font,
    )

    result = extract_text(image, languages="eng")

    print("\nOCR RESULT")
    print("------------------------------")
    print("Extracted Text:", result["text"])
    print("Languages:", result["languages"])
    print("Character Count:", result["character_count"])
    print("------------------------------")


if __name__ == "__main__":
    main()
