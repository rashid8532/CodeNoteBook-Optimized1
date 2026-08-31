from pydantic import BaseModel,ConfigDict
from uuid import UUID

class projectResponse(BaseModel):
    user_id : UUID
    id : UUID
    project_name : str
    description : str   
    model_config = ConfigDict(from_attributes=True)
    