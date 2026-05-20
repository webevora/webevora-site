from fastapi import APIRouter, Depends, Response, status

from ..dependencies import DbSession, get_current_admin_session
from ...models.admin_session import AdminSession
from ...schemas.requests import AdminLoginRequest
from ...schemas.responses import (
    AdminDashboardResponse,
    AdminLoginResponse,
    AdminProfileResponse,
    AdminSessionResponse,
    DashboardSummaryCardResponse,
    LeadResponse,
    MessageResponse,
)
from ...services.auth import admin_auth_service
from ...services.content import blogs, services
from ...services.leads import lead_service

router = APIRouter(prefix="/api", tags=["Admin"])


def _build_dashboard_response(db: DbSession, session: AdminSession) -> AdminDashboardResponse:
    recent_leads = lead_service.list_latest(db, limit=5)
    return AdminDashboardResponse(
        admin=AdminProfileResponse.from_model(session.admin),
        summary=[
            DashboardSummaryCardResponse(
                title="Total Leads",
                value=len(lead_service.list_all(db)),
                key="total_leads",
            ),
            DashboardSummaryCardResponse(
                title="New Messages",
                value=len(recent_leads),
                key="new_messages",
            ),
            DashboardSummaryCardResponse(
                title="Active Services",
                value=len(services),
                key="active_services",
            ),
            DashboardSummaryCardResponse(
                title="Published Blogs",
                value=len(blogs),
                key="published_blogs",
            ),
        ],
        quick_actions=[
            "Publish new blog article",
            "Update service information",
            "Review contact form submissions",
            "Schedule campaign update",
        ],
        traffic_snapshot=[
            "This week traffic increased by 14.8%.",
            "Top source: Organic Search (52%).",
            "Returning visitors: 38%.",
        ],
        recent_leads=[LeadResponse.from_model(lead) for lead in recent_leads],
    )


@router.get("/leads", response_model=list[LeadResponse])
def get_leads(
    db: DbSession,
    session: AdminSession = Depends(get_current_admin_session),
) -> list[LeadResponse]:
    del session
    return [LeadResponse.from_model(lead) for lead in lead_service.list_all(db)]


@router.post("/admin/login", response_model=AdminLoginResponse)
def admin_login(
    payload: AdminLoginRequest,
    response: Response,
    db: DbSession,
) -> AdminLoginResponse:
    session = admin_auth_service.login(db, str(payload.email), payload.password, response)
    return AdminLoginResponse(
        ok=True,
        message="Login successful",
        admin=AdminProfileResponse.from_model(session.admin),
        expires_at=session.expires_at,
    )


@router.get("/admin/session", response_model=AdminSessionResponse)
def get_admin_session(
    session: AdminSession = Depends(get_current_admin_session),
) -> AdminSessionResponse:
    return AdminSessionResponse(
        ok=True,
        authenticated=True,
        admin=AdminProfileResponse.from_model(session.admin),
        expires_at=session.expires_at,
    )


@router.post("/admin/logout", response_model=MessageResponse, status_code=status.HTTP_200_OK)
def admin_logout(
    response: Response,
    db: DbSession,
    session: AdminSession = Depends(get_current_admin_session),
) -> MessageResponse:
    admin_auth_service.logout(db, session, response)
    return MessageResponse(ok=True, message="Logged out successfully")


@router.get("/admin/dashboard", response_model=AdminDashboardResponse)
def get_admin_dashboard(
    db: DbSession,
    session: AdminSession = Depends(get_current_admin_session),
) -> AdminDashboardResponse:
    return _build_dashboard_response(db, session)
