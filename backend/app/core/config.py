import os
from dataclasses import dataclass

from dotenv import load_dotenv

load_dotenv()


def _get_cors_origins() -> list[str]:
    raw_origins = os.getenv("WEBENTRA_CORS_ORIGINS", "").strip()
    if raw_origins:
        return [origin.strip() for origin in raw_origins.split(",") if origin.strip()]

    return [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://webevora.com",
    ]


def _get_bool_env(name: str, default: bool) -> bool:
    raw_value = os.getenv(name)
    if raw_value is None:
        return default
    return raw_value.strip().lower() in {"1", "true", "yes", "on"}


@dataclass(frozen=True)
class Settings:
    app_title: str = "WebEntra API"
    app_version: str = "1.0.0"
    database_url: str = os.getenv("WEBENTRA_DATABASE_URL", "sqlite:///./webentra.db")
    admin_email: str = os.getenv("WEBENTRA_ADMIN_EMAIL", "admin@webentra.com").strip().lower()
    admin_password: str = os.getenv("WEBENTRA_ADMIN_PASSWORD", "Admin@12345")
    admin_name: str = os.getenv("WEBENTRA_ADMIN_NAME", "WebEntra Admin")
    admin_role: str = "admin"
    session_cookie_name: str = os.getenv("WEBENTRA_SESSION_COOKIE_NAME", "webentra_admin_session")
    session_cookie_secure: bool = _get_bool_env("WEBENTRA_SESSION_COOKIE_SECURE", False)
    session_ttl_hours: int = int(os.getenv("WEBENTRA_ADMIN_SESSION_TTL_HOURS", "12"))
    cors_origins: list[str] = None

    def __post_init__(self) -> None:
        object.__setattr__(self, "cors_origins", _get_cors_origins())


settings = Settings()
