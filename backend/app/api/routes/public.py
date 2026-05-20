from fastapi import APIRouter

from ...api.dependencies import DbSession
from ...schemas.requests import ContactRequest
from ...schemas.responses import ContactSubmitResponse, HealthResponse, LeadResponse, SiteResponse
from ...services.content import blogs, projects, services, site, testimonials
from ...services.leads import lead_service

router = APIRouter(prefix="/api")


@router.get("/health", response_model=HealthResponse, tags=["System"])
def health() -> HealthResponse:
    return HealthResponse(status="ok")


@router.get("/site", response_model=SiteResponse, tags=["Public"])
def get_site() -> SiteResponse:
    return SiteResponse(**site)


@router.get("/services", response_model=list[str], tags=["Public"])
def get_services() -> list[str]:
    return services


@router.get("/projects", response_model=list[str], tags=["Public"])
def get_projects() -> list[str]:
    return projects


@router.get("/testimonials", response_model=list[str], tags=["Public"])
def get_testimonials() -> list[str]:
    return testimonials


@router.get("/blogs", response_model=list[str], tags=["Public"])
def get_blogs() -> list[str]:
    return blogs


@router.post("/contact", response_model=ContactSubmitResponse, tags=["Public"])
def submit_contact(payload: ContactRequest, db: DbSession) -> ContactSubmitResponse:
    lead = lead_service.create(db, payload)
    return ContactSubmitResponse(
        ok=True,
        message="Inquiry submitted",
        lead=LeadResponse.from_model(lead),
    )
