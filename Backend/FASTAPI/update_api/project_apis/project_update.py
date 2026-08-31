from fastapi import APIRouter ,Depends,HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_,and_
from DATABASE.Tables.projects_table import Project
from DATABASE.database import get_db 
from DATABASE.Tables.users_table import User
from FASTAPI.post_apis.Users_api.auth.Signin_api import get_current_user


router = APIRouter()

@router.patch("/update_project")
def update_project(
    project_name : str,
    updated_name : str,
    updated_description : str = "updated description",
    current_user : User = Depends(get_current_user),
    db : Session = Depends(get_db)
):

    
    project = db.query(Project).filter(
        and_(
            Project.user_id == current_user.id,
            Project.project_name == project_name,
        )
    ).first()

    if not project :
        raise HTTPException(
            status_code= 404,
            detail="project not found"
        )

    project.project_name = updated_name
    project.description = updated_description

    try :
        db.commit()
        db.refresh(project)
        return project

    except Exception:
        db.rollback()
        raise HTTPException(
            status_code = 400,
            detail="project faild to update"
        )

