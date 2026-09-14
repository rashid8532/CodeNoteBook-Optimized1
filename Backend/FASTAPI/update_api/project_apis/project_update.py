from fastapi import APIRouter ,Depends,HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_,and_
from DATABASE.Tables.projects_table import Project
from DATABASE.database import get_db 
from DATABASE.Tables.users_table import User
from FASTAPI.user import currentUser

router = APIRouter()

@router.patch("/update_project")
def update_project(
    project_name : str,
    updated_name : str,
    updated_description : str = "updated description",
    db : Session = Depends(get_db)
):
    current_user = currentUser.get()

    
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

