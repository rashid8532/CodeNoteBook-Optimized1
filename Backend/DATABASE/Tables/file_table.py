from sqlalchemy import Column,String,Text,text,DateTime,ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from DATABASE.database import Base

class File(Base):
    __tablename__ = "files"
    id = Column(
        UUID (as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()")
    )

    project_id = Column(
        UUID(as_uuid=True),
        ForeignKey("projects.id")
    )

    file_name = Column(String,nullable=False)

    file_content = Column(Text)

    created_at = Column(DateTime,server_default=text("CURRENT_TIMESTAMP"))

    updated_at = Column(DateTime,server_default=text("CURRENT_TIMESTAMP"))