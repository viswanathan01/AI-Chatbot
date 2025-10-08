from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as genai
import uvicorn

# Configure AI
API_KEY = "AIzaSyBy8w7EVh1No5QA_9JpfUPL3nPEhPfI3Gs"
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash-lite")
chat = model.start_chat()

app = FastAPI()

class UserMessage(BaseModel):
    message: str

@app.post("/chat")
def chat_with_ai(user_msg: UserMessage):
    response = chat.send_message(user_msg.message)
    return {"reply": response.text}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
