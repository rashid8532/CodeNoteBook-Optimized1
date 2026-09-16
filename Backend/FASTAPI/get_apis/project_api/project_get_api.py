from fastapi import Depends,APIRouter,HTTPException
from sqlalchemy.orm import Session
from DATABASE.database import get_db
from DATABASE.Tables.projects_table import Project
from FASTAPI.user import currentUser
from DATABASE.Tables.users_table import User
from FASTAPI.post_apis.pydanticModels.get_project_model import projectResponse


router = APIRouter()

@router.get("/get_projects",response_model=list[projectResponse])
def get_all_projects(
    db : Session = Depends(get_db)
    ):
    current_user = currentUser.get()

    projects = db.query(Project).filter(Project.user_id == current_user.id,).all()

    if len(projects) == 0:
        return []
    return(projects)

@router.get("/get_project",response_model=list[projectResponse])
def get_project(
    project_name : str,
    db : Session = Depends(get_db)
    ):
    current_user = currentUser.get()

    project = db.query(Project).filter(
        Project.user_id == current_user.id,
        Project.project_name == project_name).first()

    if len(project) == 0:
        raise HTTPException(status_code=404,detail=f"Here is no project called {project_name}")
    return(project)