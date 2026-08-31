from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import and_,or_
from DATABASE.database import get_db
from FASTAPI.post_apis.Users_api.auth.Signin_api import get_current_user
from DATABASE.Tables.file_table import File 
from DATABASE.Tables.projects_table import Project
from DATABASE.Tables.users_table import User


router = APIRouter()

@router.patch("/file_update")
def update_file_name(
    file_name : str,
    file_updated_name : str,
    db : Session = Depends(get_db),
    current_user : User = Depends(get_current_user)
):
    files = db.query(File).filter(
        and_(
            current_user.id == Project.user_id,
            Project.id == File.project_id,
        )
    ).all()

    file = db.query(File).filter(
        and_(
            current_user.id == Project.user_id,
            Project.id == File.project_id,
            File.file_name == file_name,
        )
    ).first()

    for i in files:
        if file_updated_name == i.file_name:
            raise HTTPException(
                status_code=404,
                detail="the file of same name already exist"
            )


    if file == None:
        raise HTTPException(
            status_code=404,
            detail="file not found"
        )
    
    file.file_name = file_updated_name

    try:
        db.commit()
        db.refresh(file)
        return{
            "massege" : "filename updated successfully",
            "file" : file
        }
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=409,
            detail="something went wrong "
        )
    
    
    