from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from DATABASE.database import get_db
from DATABASE.Tables.projects_table import Project
from FASTAPI.post_apis.pydanticModels.new_project_model import create_projects
from FASTAPI.user import currentUser
from DATABASE.Tables.users_table import User


router = APIRouter()

@router.post("/new_project")
def new_Project(
    project:create_projects,
    db:Session = Depends(get_db)):

    current_user = currentUser.get()
    
    project_exist = db.query(Project).filter(
        Project.user_id == current_user.id,
        Project.project_name == project.project_name
    ).first()
    if project_exist:
        raise HTTPException(
            status_code= 400,
            detail= "project already exist"
        )
    new_project = Project(
        user_id = current_user.id,
        project_name = project.project_name,
        description = project.description
    )

    try:
        db.add(new_project)
        db.commit()
        db.refresh(new_project)
        return ("Project successfully registerd ")
    except Exception:
        db.rollback()
        raise
