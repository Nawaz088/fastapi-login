from fastapi import FastAPI, Depends
from app.api.routes import auth
from app.api.deps import get_current_user
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="FastAPI Login System")

# Allow your frontend to talk to the backend
origins = [
    "http://localhost:5173",  # React dev server
    "http://127.0.0.1:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # allow all HTTP methods
    allow_headers=["*"],  # allow all headers
)

app.include_router(auth.router)

@app.get("/hello")
async def hello(current_user=Depends(get_current_user)):
    return {"message": f"Hello, {current_user.username}!"}
