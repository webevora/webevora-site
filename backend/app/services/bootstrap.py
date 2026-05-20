from sqlalchemy import select
from sqlalchemy.orm import Session

from ..core.config import settings
from ..models.admin_user import AdminUser
from .security import hash_password


def ensure_default_admin(db: Session) -> None:
    existing_admin = db.scalar(
        select(AdminUser).where(AdminUser.email == settings.admin_email)
    )
    if existing_admin:
        return

    admin = AdminUser(
        email=settings.admin_email,
        full_name=settings.admin_name,
        password_hash=hash_password(settings.admin_password),
        role=settings.admin_role,
    )
    db.add(admin)
    db.commit()
