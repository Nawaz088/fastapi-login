from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.core.security import verify_password, create_access_token
from app.db.login_db import users_db
from app.models.user import Token, UserInDB
from app.api.deps import get_current_user


router = APIRouter()

def authenticate_user(username: str, password: str):
    user = users_db.get(username)
    print("User found:", user)
    if not user or not verify_password(password, user["password"]):
        return False
    return {"username": user["username"]}

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    access_token = create_access_token(data={"sub": user["username"]})
    return {"access_token": access_token, "token_type": "bearer"}

# @router.get("/hello")
# async def hello(current_user=Depends(get_current_user)):
#     return {"message": f"Hello, {current_user.username}!"}

@router.post("/signup", response_model=Token)
def signup(form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.username in users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered",
        )
    users_db[form_data.username] = {
        "username": form_data.username,
        "password": form_data.password  
    }
    access_token = create_access_token(data={"sub": form_data.username})
    return {"access_token": access_token, "token_type": "bearer"}
