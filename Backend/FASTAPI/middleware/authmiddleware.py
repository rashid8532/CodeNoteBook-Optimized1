from fastapi import APIRouter,Request,HTTPException,Depends
from sqlalchemy.orm import Session
from jose import jwt,JWTError
import os
from dotenv import load_dotenv
from DATABASE.Tables.users_table import User
from DATABASE.database import SessionLocal
from FASTAPI.user import currentUser


load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

async def authenticationmiddleware(request:Request,call_next):
    if request.url.path in ["/","/signin","/signup","/docs","/openapi.json", "/redoc"]:
        return await call_next(request)

    authorization = request.headers.get("Authorization")
    print(authorization)
    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Not Authenticated"
        )
    try:
        scheme, token = authorization.split(" ",1)
        if scheme.lower() != "bearer":
            raise HTTPException(
                status_code=401,
                detail="Invalid Scheme"
            )
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        username : str = payload.get("sub")

        if not username :
            raise HTTPException(
                status_code=404,
                detail="user not found"
            )
        db:Session=SessionLocal()

        user = db.query(User).filter(username == User.username).first()
        
        if not user:
            raise HTTPException(
                status_code=404,
                detail= "user not found"
                )
        tokenContext = currentUser.set(user)

        try:
            return await call_next(request)

        finally:
            currentUser.reset(tokenContext)

    except(JWTError,ValueError):
        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )
    finally:
        db.close()