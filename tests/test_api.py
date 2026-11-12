
from fastapi.testclient import TestClient

from backend.main import app


client = TestClient(app)


def test_health_endpoint():
    response = client.get("/api/health")

    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_valid_https_url():
    response = client.post(
        "/api/analyze-url",
        json={"url": "https://www.example.com"},
    )

    assert response.status_code == 200

    data = response.json()

    assert data["analysis"]["domain"] == "www.example.com"
    assert data["analysis"]["domain_length"] == 15
    assert data["analysis"]["is_ip_address"] is False
    assert data["analysis"]["hyphen_count"] == 0
    assert data["analysis"]["subdomain_count"] == 1


def test_http_url_rejected():
    response = client.post(
        "/api/analyze-url",
        json={"url": "http://example.com"},
    )

    assert response.status_code == 400


def test_invalid_url_rejected():
    response = client.post(
        "/api/analyze-url",
        json={"url": "not-a-valid-url"},
    )

    assert response.status_code == 400


def test_missing_url_rejected():
    response = client.post(
        "/api/analyze-url",
        json={},
    )

    assert response.status_code == 422


def test_ip_address_detection():
    response = client.post(
        "/api/analyze-url",
        json={"url": "https://192.168.1.1"},
    )

    assert response.status_code == 200
    assert response.json()["analysis"]["is_ip_address"] is True


def test_url_with_hyphen():
    response = client.post(
        "/api/analyze-url",
        json={"url": "https://my-brand.example.com"},
    )

    assert response.status_code == 200
    assert response.json()["analysis"]["hyphen_count"] == 1
