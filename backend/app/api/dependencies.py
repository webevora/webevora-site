from typing import Annotated

from fastapi import Cookie, Depends, Response
from sqlalchemy.orm import Session

from ..core.config import settings
from ..db.session import get_db
from ..models.admin_session import AdminSession
from ..services.auth import admin_auth_service


DbSession = Annotated[Session, Depends(get_db)]


def get_current_admin_session(
    db: DbSession,
    response: Response,
    session_id: str | None = Cookie(default=None, alias=settings.session_cookie_name),
) -> AdminSession:
    return admin_auth_service.get_active_session(db, session_id, response)
