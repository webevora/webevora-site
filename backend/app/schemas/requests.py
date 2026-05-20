from pydantic import BaseModel, EmailStr, Field


class ContactRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    phone: str | None = Field(default=None, min_length=7, max_length=20)
    email: EmailStr | None = None
    service: str | None = Field(default=None, max_length=120)
    message: str = Field(min_length=5, max_length=2000)


class AdminLoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)
