from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import and_
from DATABASE.database import get_db 
from FASTAPI.post_apis.Users_api.auth.Signin_api import get_current_user
from DATABASE.Tables.users_table import User 


router = APIRouter()

@router.get("/get_user_data")
def get_user_data(
    current_user : User = Depends(get_current_user),
    db: Session =Depends(get_db)
    ):
    user = db.query(User).filter(User.id == current_user.id).first()
    userData={
        "UserName" : user.username,
        "FirstName" : user.first_name,
        "LastName" : user.last_name,
        "Email" : user.email
    }
    try:
        return userData
    except Exception:
        raise HTTPException(
            status_code=404,
            detail="user not found"
        )
    