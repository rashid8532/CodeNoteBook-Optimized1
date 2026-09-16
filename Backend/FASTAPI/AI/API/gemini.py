from google import genai
import os
from dotenv import load_dotenv
from FASTAPI.AI.API.constants import promptForFix
from FASTAPI.AI.API.constants import promptForOptimize
from FASTAPI.AI.API.constants import promptForAsk
from FASTAPI.AI.API.constants import promptForConvert

load_dotenv()
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)
# stream = client.models.generate_content_stream(
#     model="gemini-3.6-flash",
#     contents="write an addition function in python",
# )
# # print(interaction.output_text)

# for event in stream:
#     print(event.text, end="")
action ="Fix"
language = "java"
codeContent = "public"
def get_Response(action, language, codeContent, prompt):

    if action == "Fix":

        final_prompt = promptForFix.format(
            language=language,
            codeContent=codeContent
        )

    elif action == "Optimize":

        final_prompt = promptForOptimize.format(
            language = language,
            codeContent = codeContent
        )

    elif action == "Ask":

        final_prompt = promptForAsk.format(
            codeContent=codeContent,
            language = language,
            prompt = prompt
        )

    elif action.startswith("Convert"):

        final_prompt = promptForConvert.format(
            language=language,
            codeContent = codeContent   
        )
    else:
        return "Invalid action."

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=final_prompt
    )

    return response.text

# get_Response(action ,language,codeContent,prompt="this")