from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.routes.admin import router as admin_router
from .api.routes.public import router as public_router
from .core.config import settings
from .db.session import SessionLocal
from .services.bootstrap import ensure_default_admin


@asynccontextmanager
async def lifespan(_: FastAPI):
    db = SessionLocal()
    try:
        ensure_default_admin(db)
        yield
    finally:
        db.close()


app = FastAPI(title=settings.app_title, version=settings.app_version, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(public_router)
app.include_router(admin_router)
