from pydantic import BaseModel

class AI(BaseModel):
    action: str
    language : str
    code :str
    prompt : str