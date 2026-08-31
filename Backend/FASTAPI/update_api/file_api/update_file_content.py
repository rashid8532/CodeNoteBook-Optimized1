from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import and_,or_
from DATABASE.database import get_db
from FASTAPI.post_apis.Users_api.auth.Signin_api import get_current_user
from DATABASE.Tables.file_table import File 
from DATABASE.Tables.projects_table import Project
from DATABASE.Tables.users_table import User



router = APIRouter()

@router.put("/update_file_content")
def update_file_content(
    file_name : str,
    file_updated_content : str | None,
    db : Session = Depends(get_db),
    current_user : User = Depends(get_current_user)
):
    file = db.query(File).filter(
        and_(
            current_user.id == Project.user_id,
            Project.id == File.project_id,
            File.file_name == file_name,
        )
    ).first()


    if file == None:
        raise HTTPException(
            status_code=404,
            detail="file not found"
        ) 
    file_previous_content =  file.file_content
    
    file.file_content = file_updated_content

    try:
        db.commit()
        db.refresh(file)
        return{
            "massege" : "file content updated successfully",
            "file" : file,
            "file_previous_content is" : file_previous_content
        }
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=409,
            detail="something went wrong "
        )
    
    
    