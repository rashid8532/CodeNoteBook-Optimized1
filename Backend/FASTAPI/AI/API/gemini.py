from google import genai
import os
from dotenv import load_dotenv

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

        final_prompt = f"""
You are a professional code debugging assistant.

TASK:
Fix every bug or error in the provided code.

STRICT RULES:
- Do not change the intended functionality.
- Do not add any new functionality.
- Do not remove any existing functionality.
- Fix syntax and logical errors.
- Return the complete corrected code.
- Do not explain anything.
- Do not add any extra words.
- Do not use Markdown code fences.
- Return ONLY the corrected code.

PROGRAMMING LANGUAGE:
{language}

CODE:
{codeContent}
"""

    elif action == "Optimize":

        final_prompt = f"""
You are a professional code optimization assistant.

TASK:
Optimize the provided code.

STRICT RULES:
- Preserve the original functionality.
- Do not add new functionality.
- Do not remove existing functionality.
- Do not change the expected output.
- Improve time complexity where possible.
- Improve space complexity where possible.
- Improve readability where possible.
- Do not make unnecessary changes.
- Return the complete optimized code.
- Do not explain anything.
- Do not add any extra words.
- Do not use Markdown code fences.
- Return ONLY the optimized code.

PROGRAMMING LANGUAGE:
{language}

CODE:
{codeContent}
"""

    elif action == "Ask":

        final_prompt = f"""
You are a professional code generation assistant.

TASK:
Generate code according to the user's request.

STRICT RULES:
- add new code but dont remove old code untill user say to remov
- Follow the requested programming language.
- Follow the user's requirements exactly.
- Generate complete working code.
- Do not invent unnecessary requirements.
- Do not add unnecessary functionality.
- Return ONLY the code.
- Do not explain anything.
- Do not add any extra words.
- Do not use Markdown code fences.

PROGRAMMING LANGUAGE:
{language}

USER REQUEST:
{prompt}

CURRENT CODE :
{codeContent} if user want to change this code so change it only else do what user want 
"""

    elif action.startswith("Convert"):

        final_prompt = f"""
You are a professional code conversion assistant.

TASK:
Identify the programming language of the provided code and
convert it to the target programming language.

STRICT RULES:
- First identify the source programming language from the code.
- Convert the code to the target language.
- Preserve the original functionality.
- Do not add new functionality.
- Do not remove existing functionality.
- Preserve the expected output and behavior.
- Use proper syntax and conventions of the target language.
- Return the complete converted code.
- Do not explain the conversion.
- Do not mention the detected source language.
- Do not add any extra words.
- Do not use Markdown code fences.
- Return ONLY the converted code.

TARGET PROGRAMMING LANGUAGE:
{language}

CODE TO CONVERT:
{codeContent}
"""

    else:
        return "Invalid action."

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=final_prompt
    )
    print("GEMINI REQUEST SENT")

    return response.text

# get_Response(action ,language,codeContent,prompt="this")