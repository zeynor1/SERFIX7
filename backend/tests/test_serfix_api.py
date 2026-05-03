import os
import uuid

import pytest
import requests


BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    raise RuntimeError("REACT_APP_BACKEND_URL is required for backend API tests")


@pytest.fixture(scope="module")
def api_client():
    """Shared HTTP client for SERFIX API tests."""
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


@pytest.fixture(scope="module")
def created_inquiry(api_client):
    """Inquiry module fixture to validate create -> get persistence."""
    payload = {
        "name": f"TEST_SERFIX_{uuid.uuid4().hex[:8]}",
        "phone": "3069427345",
        "email": "qa.serfix@example.com",
        "service": "General maintenance",
        "message": "Need help with door trim and minor drywall touchups.",
    }

    response = api_client.post(f"{BASE_URL}/api/inquiries", json=payload, timeout=30)
    assert response.status_code == 200

    data = response.json()
    assert data["name"] == payload["name"]
    assert data["phone"] == payload["phone"]
    assert data["service"] == payload["service"]
    assert data["message"] == payload["message"]
    assert data["email"] == payload["email"]
    assert data["status"] == "new"
    assert isinstance(data["id"], str)
    assert data["id"]

    return payload, data


class TestSerfixPublicApi:
    """SERFIX public API tests: readiness and inquiry workflows."""

    # /api readiness endpoint checks
    def test_health_endpoint_returns_serfix_message(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/", timeout=30)
        assert response.status_code == 200

        data = response.json()
        assert data["message"] == "SERFIX Service Limited API is ready"

    # /api/inquiries create + list persistence checks
    def test_get_inquiries_persists_created_record_and_excludes_mongo_id(self, api_client, created_inquiry):
        payload, created = created_inquiry

        response = api_client.get(f"{BASE_URL}/api/inquiries", timeout=30)
        assert response.status_code == 200

        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0

        matched = [item for item in data if item.get("id") == created["id"]]
        assert len(matched) == 1

        inquiry = matched[0]
        assert inquiry["name"] == payload["name"]
        assert inquiry["phone"] == payload["phone"]
        assert inquiry["service"] == payload["service"]
        assert inquiry["message"] == payload["message"]
        assert inquiry["email"] == payload["email"]
        assert "_id" not in inquiry

    # /api/inquiries validation checks
    def test_create_inquiry_with_missing_required_fields_returns_422(self, api_client):
        response = api_client.post(
            f"{BASE_URL}/api/inquiries",
            json={"name": "A", "phone": "123"},
            timeout=30,
        )
        assert response.status_code == 422

        data = response.json()
        assert "detail" in data