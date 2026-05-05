"""Settings endpoints."""

from fastapi import APIRouter
from database import get_db
from models import SettingsResponse, SettingsUpdate

router = APIRouter(tags=["Settings"])


@router.get("/settings", response_model=list[SettingsResponse])
def list_settings():
    with get_db() as db:
        rows = db.execute("SELECT key, value FROM app_settings ORDER BY key").fetchall()
    return [SettingsResponse(key=r["key"], value=r["value"]) for r in rows]


@router.patch("/settings/{key}", response_model=SettingsResponse)
def update_setting(key: str, body: SettingsUpdate):
    with get_db() as db:
        db.execute(
            "INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?)",
            (key, body.value),
        )
    return SettingsResponse(key=key, value=body.value)
