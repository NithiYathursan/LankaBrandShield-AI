
from unittest.mock import patch

from fastapi.testclient import TestClient

from backend.main import app

client = TestClient(app)


def test_get_brands_empty():
    with patch("backend.main.list_brands", return_value=[]):
        response = client.get("/api/brands")

    assert response.status_code == 200
    assert response.json() == {"brands": []}


def test_get_brands_with_data():
    sample_brands = [
        {
            "id": 1,
            "brand_name": "Example Bank",
            "official_domain": "example.lk",
            "industry": "Banking",
            "verification_status": "pending",
        }
    ]

    with patch(
        "backend.main.list_brands",
        return_value=sample_brands,
    ):
        response = client.get("/api/brands")

    assert response.status_code == 200
    assert response.json() == {"brands": sample_brands}
