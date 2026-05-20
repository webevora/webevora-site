"""create admin and lead tables

Revision ID: 20260410_0001
Revises: None
Create Date: 2026-04-10 17:20:00
"""

from alembic import op
import sqlalchemy as sa


revision = "20260410_0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "admin_users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("full_name", sa.String(length=150), nullable=False),
        sa.Column("password_hash", sa.String(length=255), nullable=False),
        sa.Column("role", sa.String(length=50), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_admin_users_email"), "admin_users", ["email"], unique=True)
    op.create_index(op.f("ix_admin_users_id"), "admin_users", ["id"], unique=False)

    op.create_table(
        "leads",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("phone", sa.String(length=20), nullable=True),
        sa.Column("email", sa.String(length=255), nullable=True),
        sa.Column("service", sa.String(length=120), nullable=True),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_leads_created_at"), "leads", ["created_at"], unique=False)
    op.create_index(op.f("ix_leads_email"), "leads", ["email"], unique=False)
    op.create_index(op.f("ix_leads_id"), "leads", ["id"], unique=False)

    op.create_table(
        "admin_sessions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("session_id", sa.String(length=255), nullable=False),
        sa.Column("admin_user_id", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("expires_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["admin_user_id"], ["admin_users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_admin_sessions_admin_user_id"), "admin_sessions", ["admin_user_id"], unique=False)
    op.create_index(op.f("ix_admin_sessions_expires_at"), "admin_sessions", ["expires_at"], unique=False)
    op.create_index(op.f("ix_admin_sessions_id"), "admin_sessions", ["id"], unique=False)
    op.create_index(op.f("ix_admin_sessions_session_id"), "admin_sessions", ["session_id"], unique=True)


def downgrade() -> None:
    op.drop_index(op.f("ix_admin_sessions_session_id"), table_name="admin_sessions")
    op.drop_index(op.f("ix_admin_sessions_id"), table_name="admin_sessions")
    op.drop_index(op.f("ix_admin_sessions_expires_at"), table_name="admin_sessions")
    op.drop_index(op.f("ix_admin_sessions_admin_user_id"), table_name="admin_sessions")
    op.drop_table("admin_sessions")

    op.drop_index(op.f("ix_leads_id"), table_name="leads")
    op.drop_index(op.f("ix_leads_email"), table_name="leads")
    op.drop_index(op.f("ix_leads_created_at"), table_name="leads")
    op.drop_table("leads")

    op.drop_index(op.f("ix_admin_users_id"), table_name="admin_users")
    op.drop_index(op.f("ix_admin_users_email"), table_name="admin_users")
    op.drop_table("admin_users")
