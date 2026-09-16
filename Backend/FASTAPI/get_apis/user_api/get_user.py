from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import and_
from DATABASE.database import get_db 
from FASTAPI.user import currentUser
from DATABASE.Tables.users_table import User 


router = APIRouter()

@router.get("/get_user_data")
def get_user_data(
    db: Session =Depends(get_db)
    ):
    current_user = currentUser.get()
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
    