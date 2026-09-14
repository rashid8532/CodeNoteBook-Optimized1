from fastapi import APIRouter,Depends
from FASTAPI.AI.pydantic_model_AI import AI
from FASTAPI.AI.API.gemini import get_Response
from FASTAPI.post_apis.Users_api.auth.Signin_api import get_current_user



router = APIRouter()

@router.post("/ai")
def Ai_call(call_content : AI,current_user = Depends(get_current_user)):
    response = get_Response(
        call_content.action,
        call_content.language,
        call_content.code,
        call_content.prompt
    )

    return {
        "response" : response 
    }
    