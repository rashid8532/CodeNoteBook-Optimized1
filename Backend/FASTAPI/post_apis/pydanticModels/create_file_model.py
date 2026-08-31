from pydantic import BaseModel
from uuid import UUID

class CreateFile(BaseModel):
    project_id : UUID
    file_name : str