from fastapi import APIRouter,Request,HTTPException
from jose import jwt,JWTError
import os
from dotenv import load_dotenv

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
        scheme, token = authorization.split(" ")
        if scheme.lower() != "bearer":
            raise HTTPException(
                status_code=401,
                detail="Invalid Scheme"
            )
        jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
    except(JWTError,ValueError):
        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )
    return await call_next(request)