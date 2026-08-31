from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from FASTAPI.post_apis.Users_api.auth.Signin_api import router as signin_router
from FASTAPI.post_apis.Users_api.auth.Signup_api import router as signup_router
from FASTAPI.post_apis.Projects_api.new_project import router as new_project_router
from FASTAPI.get_apis.project_api.project_get_api import router as get_project_router
from FASTAPI.update_api.project_apis.project_update import router as project_updade_router
from FASTAPI.delete_api.delete_project_api import router as project_delete_router
from FASTAPI.post_apis.File_api.create_file import router as create_file_router
from FASTAPI.get_apis.file_api.get_file_api import router as get_file_router
from FASTAPI.update_api.file_api.update_file_name import router as update_file_router
from FASTAPI.update_api.file_api.update_file_content import router as update_file_content_router
from FASTAPI.delete_api.delete_file_api import router as delete_file_router
from FASTAPI.get_apis.user_api.get_user import router as user_data_router
from FASTAPI.AI.API.AI_post_api import router as ai_router


app = FastAPI()

# Allowed origen (Front end url)
origins =[
    "http://localhost:5173",
    "http://127.0.0.1:5173"
          ]

app.add_middleware(
    CORSMiddleware,
    allow_origins= origins, # Allowed frontend
    allow_credentials= True,
    allow_methods= ["*"], 
    allow_headers= ["*"]
)

app.include_router(signin_router)
app.include_router(signup_router)
app.include_router(new_project_router)
app.include_router(get_project_router)
app.include_router(project_updade_router)
app.include_router(project_delete_router)
app.include_router(create_file_router)
app.include_router(get_file_router)
app.include_router(update_file_router)
app.include_router(update_file_content_router)
app.include_router(delete_file_router)
app.include_router(user_data_router)
app.include_router(ai_router)