import secrets
from datetime import datetime, timedelta

from fastapi import HTTPException, Response, status
from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from ..core.config import settings
from ..models.admin_session import AdminSession
from ..models.admin_user import AdminUser
from .security import verify_password


class AdminAuthService:
    def login(self, db: Session, email: str, password: str, response: Response) -> AdminSession:
        admin = db.scalar(
            select(AdminUser).where(AdminUser.email == email.strip().lower())
        )

        if not admin or not verify_password(password, admin.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid admin email or password",
            )

        expires_at = datetime.utcnow() + timedelta(hours=settings.session_ttl_hours)
        session = AdminSession(
            session_id=secrets.token_urlsafe(32),
            admin_user_id=admin.id,
            expires_at=expires_at,
        )
        db.add(session)
        db.commit()
        db.refresh(session)

        self._set_session_cookie(response, session.session_id, expires_at)
        return session

    def get_active_session(
        self,
        db: Session,
        session_id: str | None,
        response: Response | None = None,
    ) -> AdminSession:
        if not session_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Admin session cookie is missing",
            )

        session = db.scalar(
            select(AdminSession)
            .where(AdminSession.session_id == session_id)
            .join(AdminSession.admin)
        )

        if not session:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Session not found",
            )

        if session.expires_at <= datetime.utcnow():
            db.delete(session)
            db.commit()
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Session expired",
            )

        if response is not None:
            self._refresh_session_cookie_if_needed(db, session, response)

        return session

    def logout(self, db: Session, session: AdminSession, response: Response) -> None:
        db.execute(delete(AdminSession).where(AdminSession.id == session.id))
        db.commit()
        response.delete_cookie(
            key=settings.session_cookie_name,
            httponly=True,
            secure=settings.session_cookie_secure,
            samesite="lax",
            path="/",
        )

    def _set_session_cookie(self, response: Response, session_id: str, expires_at: datetime) -> None:
        max_age = max(int((expires_at - datetime.utcnow()).total_seconds()), 0)
        response.set_cookie(
            key=settings.session_cookie_name,
            value=session_id,
            httponly=True,
            secure=settings.session_cookie_secure,
            samesite="lax",
            max_age=max_age,
            expires=expires_at,
            path="/",
        )

    def _refresh_session_cookie_if_needed(self, db: Session, session: AdminSession, response: Response) -> None:
        remaining = session.expires_at - datetime.utcnow()
        refresh_window = timedelta(hours=max(settings.session_ttl_hours // 2, 1))

        if remaining > refresh_window:
            return

        session.expires_at = datetime.utcnow() + timedelta(hours=settings.session_ttl_hours)
        db.add(session)
        db.commit()
        db.refresh(session)
        self._set_session_cookie(response, session.session_id, session.expires_at)


admin_auth_service = AdminAuthService()
