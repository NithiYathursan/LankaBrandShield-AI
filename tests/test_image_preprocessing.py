import unittest
from PIL import Image

from src.image_preprocessing import preprocess_image


class TestImagePreprocessing(unittest.TestCase):

    def test_rgba_to_rgb_conversion(self):
        image = Image.new("RGBA", (800, 600), "white")

        result = preprocess_image(image)

        self.assertEqual(result.mode, "RGB")

    def test_large_image_resizing(self):
        image = Image.new("RGB", (1920, 1080), "white")

        result = preprocess_image(image)

        self.assertEqual(result.size, (1200, 675))

    def test_aspect_ratio_preservation(self):
        image = Image.new("RGB", (1600, 800), "white")

        result = preprocess_image(image)

        self.assertEqual(result.size, (1200, 600))

    def test_small_image_unchanged_size(self):
        image = Image.new("RGB", (600, 400), "white")

        result = preprocess_image(image)

        self.assertEqual(result.size, (600, 400))

    def test_invalid_max_width(self):
        image = Image.new("RGB", (800, 600), "white")

        with self.assertRaises(ValueError):
            preprocess_image(image, max_width=0)

    def test_custom_max_width(self):
        image = Image.new("RGB", (1600, 900), "white")

        result = preprocess_image(image, max_width=800)

        self.assertEqual(result.size, (800, 450))

    def test_grayscale_to_rgb_conversion(self):
        image = Image.new("L", (800, 600))

        result = preprocess_image(image)

        self.assertEqual(result.mode, "RGB")


if __name__ == "__main__":
    unittest.main()