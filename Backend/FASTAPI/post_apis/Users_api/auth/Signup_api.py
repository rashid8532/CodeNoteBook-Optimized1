from fastapi import Depends,HTTPException
from fastapi import APIRouter
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from FASTAPI.post_apis.pydanticModels.Signup_model import UserCreate
from DATABASE.database import get_db
from DATABASE.Tables.users_table import User



router = APIRouter()



password_context = CryptContext(schemes=["bcrypt"])

Oauth2_scheme = OAuth2PasswordBearer(tokenUrl="signup")


@router.post("/signup")
def signup(user:UserCreate,db:Session = Depends(get_db)):
    email_exist = db.query(User).filter(User.email == user.email).first()
    name_exist = db.query(User).filter(User.username == user.username).first()
    if email_exist :
        raise HTTPException(
            status_code= 400,
            detail= "Email already registered"
        )
    elif name_exist :
        raise HTTPException(
            status_code= 400,
            detail= "username already registered"
            )
    email = user.email[-9:]
    if email != "gmail.com":
        raise HTTPException(
            status_code=409,
            detail="email is not correct"
        )
    new_user = User(
        first_name = user.first_name,
        last_name = user.last_name,
        username = user.username,
        email = user.email,
        password_hash = password_context.hash(user.password)
    )

    
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return "user registerd successfully"
    except Exception:
        db.rollback()
        raise
