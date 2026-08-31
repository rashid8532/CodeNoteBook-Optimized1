from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import and_
from DATABASE.Tables.users_table import User
from DATABASE.Tables.file_table import File
from DATABASE.Tables.projects_table import Project
from DATABASE.database import get_db
from FASTAPI.post_apis.Users_api.auth.Signin_api import get_current_user


router = APIRouter()

@router.delete("/delete_file")
def delete_file(
    file_name : str,
    db : Session = Depends(get_db),
    current_user : User = Depends(get_current_user)
):
    print("came to fillter")
    file = db.query(File).filter(
        and_(
            File.file_name == file_name,
            File.project_id == Project.id,
            Project.user_id == current_user.id
        )
    ).first()
    print(file)
    print("came out from fillter")


    if file == None:
        raise HTTPException(
            status_code= 404,
            detail="file not found"
        )
    try:
        db.delete(file)
        db.commit()
        # db.refresh(File)
        return("file successfully deleted")
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="something went wrong "
        )

    