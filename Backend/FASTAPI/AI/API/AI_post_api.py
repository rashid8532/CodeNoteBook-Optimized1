from fastapi import APIRouter
from FASTAPI.AI.pydantic_model_AI import AI
from FASTAPI.AI.API.gemini import get_Response


router = APIRouter()

@router.post("/ai")
def Ai_call(call_content : AI):
    response = get_Response(
        call_content.action,
        call_content.language,
        call_content.code,
        call_content.prompt
    )

    return {
        "response" : response 
    }
    