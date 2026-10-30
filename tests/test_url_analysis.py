import unittest

from src.url_analysis import analyze_url


class TestURLAnalysis(unittest.TestCase):

    def test_valid_https_url(self):
        result = analyze_url("https://example.com")

        self.assertEqual(result["domain"], "example.com")
        self.assertEqual(result["domain_length"], 11)
        self.assertFalse(result["is_ip_address"])

    def test_ip_address(self):
        result = analyze_url("https://192.168.1.1")

        self.assertTrue(result["is_ip_address"])

    def test_hyphen_count(self):
        result = analyze_url("https://my-test-site.com")

        self.assertEqual(result["hyphen_count"], 2)

    def test_subdomain_count(self):
        result = analyze_url(
            "https://login.secure.example.com"
        )

        self.assertEqual(result["subdomain_count"], 2)

    def test_http_url_rejected(self):
        with self.assertRaises(ValueError):
            analyze_url("http://example.com")

    def test_empty_url_rejected(self):
        with self.assertRaises(ValueError):
            analyze_url("")

    def test_credentials_rejected(self):
        with self.assertRaises(ValueError):
            analyze_url(
                "https://user:password@example.com"
            )


if __name__ == "__main__":
    unittest.main()