from pydantic import BaseModel,ConfigDict
from uuid import UUID

class FileResponse(BaseModel):
    project_id : UUID
    id : UUID
    file_name : str
    file_content : str | None = None
    model_config = ConfigDict(from_attributes=True)