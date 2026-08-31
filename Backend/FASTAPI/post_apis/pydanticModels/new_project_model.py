from pydantic import BaseModel

class create_projects(BaseModel):
    project_name : str
    description: str = "Description added" 