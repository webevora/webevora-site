from sqlalchemy import desc, select
from sqlalchemy.orm import Session

from ..models.lead import Lead
from ..schemas.requests import ContactRequest


class LeadService:
    def create(self, db: Session, payload: ContactRequest) -> Lead:
        lead = Lead(
            name=payload.name,
            phone=payload.phone,
            email=str(payload.email) if payload.email else None,
            service=payload.service,
            message=payload.message,
        )
        db.add(lead)
        db.commit()
        db.refresh(lead)
        return lead

    def list_all(self, db: Session) -> list[Lead]:
        return list(db.scalars(select(Lead).order_by(desc(Lead.created_at), desc(Lead.id))).all())

    def list_latest(self, db: Session, limit: int = 5) -> list[Lead]:
        return list(
            db.scalars(
                select(Lead).order_by(desc(Lead.created_at), desc(Lead.id)).limit(limit)
            ).all()
        )


lead_service = LeadService()
