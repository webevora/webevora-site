from datetime import datetime

from pydantic import BaseModel, EmailStr

from ..models.admin_session import AdminSession
from ..models.admin_user import AdminUser
from ..models.lead import Lead


class HealthResponse(BaseModel):
    status: str


class SiteResponse(BaseModel):
    brand: str
    tagline: str
    phone: str
    email: EmailStr
    whatsapp: str
    map_embed: str


class AdminProfileResponse(BaseModel):
    email: EmailStr
    name: str
    role: str

    @classmethod
    def from_model(cls, admin: AdminUser) -> "AdminProfileResponse":
        return cls(email=admin.email, name=admin.full_name, role=admin.role)


class LeadResponse(BaseModel):
    id: int
    name: str
    phone: str | None = None
    email: EmailStr | None = None
    service: str | None = None
    message: str
    created_at: datetime

    @classmethod
    def from_model(cls, lead: Lead) -> "LeadResponse":
        return cls(
            id=lead.id,
            name=lead.name,
            phone=lead.phone,
            email=lead.email,
            service=lead.service,
            message=lead.message,
            created_at=lead.created_at,
        )


class ContactSubmitResponse(BaseModel):
    ok: bool
    message: str
    lead: LeadResponse


class AdminLoginResponse(BaseModel):
    ok: bool
    message: str
    admin: AdminProfileResponse
    expires_at: datetime


class AdminSessionResponse(BaseModel):
    ok: bool
    authenticated: bool
    admin: AdminProfileResponse
    expires_at: datetime


class MessageResponse(BaseModel):
    ok: bool
    message: str


class DashboardSummaryCardResponse(BaseModel):
    title: str
    value: int
    key: str


class AdminDashboardResponse(BaseModel):
    admin: AdminProfileResponse
    summary: list[DashboardSummaryCardResponse]
    quick_actions: list[str]
    traffic_snapshot: list[str]
    recent_leads: list[LeadResponse]


class AdminCookieSessionResponse(BaseModel):
    ok: bool
    authenticated: bool
    admin: AdminProfileResponse
    expires_at: datetime

    @classmethod
    def from_session(cls, session: AdminSession) -> "AdminCookieSessionResponse":
        return cls(
            ok=True,
            authenticated=True,
            admin=AdminProfileResponse.from_model(session.admin),
            expires_at=session.expires_at,
        )
