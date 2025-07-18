import pytest
from rest_framework.test import APIClient
from django.urls import reverse

@pytest.mark.django_db
def test_create_item():
    client = APIClient()
    url = reverse("item-list")
    payload = {"name": "Rock", "group": "Primary"}

    # Create succeeds
    resp = client.post(url, payload, format="json")
    assert resp.status_code == 201
    data = resp.json()
    assert data["name"] == "Rock"
    assert data["group"] == "Primary"

@pytest.mark.django_db
def test_duplicate_name_group_rejected():
    client = APIClient()
    url = reverse("item-list")
    payload = {"name": "Rock", "group": "Primary"}

    client.post(url, payload, format="json")                # first insert
    dup = client.post(url, payload, format="json")
    assert dup.status_code == 400
    body = dup.json()
    assert "non_field_errors" in body
    assert "must make a unique set" in body["non_field_errors"][0]

@pytest.mark.django_db
def test_patch_item_updates_name():
    client = APIClient()
    url = reverse("item-list")
    create = client.post(url, {"name": "Pebble", "group": "Secondary"}, format="json")
    item_id = create.json()["id"]

    detail_url = reverse("item-detail", args=[item_id])
    patch = client.patch(detail_url, {"name": "Stone"}, format="json")
    assert patch.status_code == 200
    assert patch.json()["name"] == "Stone"
