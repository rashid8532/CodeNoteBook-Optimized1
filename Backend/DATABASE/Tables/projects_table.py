from sqlalchemy import Column,String,Text,text,DateTime,ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from DATABASE.database import Base

class Project(Base):
    __tablename__ = "projects"
    id = Column(
        UUID (as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()")
    )

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id")
    )

    project_name = Column(String,nullable=False)

    description = Column(Text)

    created_at = Column(DateTime,server_default=text("CURRENT_TIMESTAMP"))

    updated_at = Column(DateTime,server_default=text("CURRENT_TIMESTAMP"))