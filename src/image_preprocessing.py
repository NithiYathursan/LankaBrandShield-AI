from PIL import Image, ImageOps


def preprocess_image(image: Image.Image, max_width: int = 1200) -> Image.Image:
    """
    Prepare a website screenshot for future OCR and
    computer vision analysis.

    Operations:
    1. Correct EXIF orientation.
    2. Convert to RGB.
    3. Resize if the image is wider than max_width.
    """

    if max_width <= 0:
        raise ValueError("max_width must be positive.")

    if image.width <= 0 or image.height <= 0:
        raise ValueError("Invalid image dimensions.")

    # Correct image orientation when EXIF metadata is present.
    processed = ImageOps.exif_transpose(image)

    # Convert image to RGB format.
    processed = processed.convert("RGB")

    # Resize large images while preserving aspect ratio.
    if processed.width > max_width:
        new_height = max(
            1,
            round(processed.height * max_width / processed.width)
        )

        processed = processed.resize(
            (max_width, new_height),
            Image.Resampling.LANCZOS
        )

    return processed