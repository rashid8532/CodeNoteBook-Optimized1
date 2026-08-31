from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_,and_
from DATABASE.Tables.users_table import User
from DATABASE.Tables.projects_table import Project
from DATABASE.database import get_db
from FASTAPI.post_apis.Users_api.auth.Signin_api import get_current_user
from DATABASE.Tables.file_table import File


router = APIRouter()

@router.delete("/delete_project")
def delete_project(
    project_name : str,
    current_user : User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(
        and_(
            Project.project_name == project_name,
            Project.user_id == current_user.id,
        )
    ).first()

    if not project:
        raise HTTPException(
            status_code= 404,
            detail="Project not found"
        )
    file = db.query(File).filter(File.project_id == project.id).first()

    if file:
        raise HTTPException(
            status_code=409,
            detail="there are files in this project so it can not be delete"
        )
    try:
        db.delete(project)
        db.commit()
        return("Project is successfully deleted")
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code= 500,
            detail="faild to delete "
        )