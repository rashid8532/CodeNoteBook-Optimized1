from sqlalchemy import Column, String, DateTime, text
from sqlalchemy.dialects.postgresql import UUID

from DATABASE.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()")
    )

    first_name = Column(String(100))
    last_name = Column(String(100))
    username = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    profile_image = Column(String(255))

    created_at = Column(
        DateTime,
        server_default=text("CURRENT_TIMESTAMP")
    )

    updated_at = Column(
        DateTime,
        server_default=text("CURRENT_TIMESTAMP")
    )