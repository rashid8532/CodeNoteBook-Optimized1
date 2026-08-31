from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import and_ , or_
from DATABASE.database import get_db
from FASTAPI.post_apis.Users_api.auth.Signin_api import get_current_user
from FASTAPI.post_apis.pydanticModels.get_file_model import FileResponse
from DATABASE.Tables.users_table import User
from DATABASE.Tables.projects_table import Project
from DATABASE.Tables.file_table import File


router = APIRouter()

@router.get("/get_files",response_model=list[FileResponse])
def get_files(
    project_id : str,
    current_user : User = Depends(get_current_user), 
    db:Session = Depends(get_db),
):
    project = db.query(Project).filter(
    Project.id == project_id,
    Project.user_id == current_user.id
    ).first()

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found."
        )

    files = db.query(File).filter(
        File.project_id == project.id
    ).all()

    if not files :
         return []

    return files


@router.get("/get_files_byname")
def get_file_byname(
    file_name = str,
    current_user : User = Depends(get_current_user), 
    db:Session = Depends(get_db),
    ):
        UserFile = db.query(File).filter(
            and_(
                current_user.id == Project.user_id,
                Project.id == File.project_id,
                File.file_name == file_name
            )
        ).first()
        if UserFile == None:
            raise HTTPException(
            status_code=404,
            detail="file not exist in this folder ")
        try:
            return(UserFile)
        except Exception:
            if len(UserFile) == 0:
                raise HTTPException(
                    status_code=404,
                    detail="No file exist"
                )
    
    