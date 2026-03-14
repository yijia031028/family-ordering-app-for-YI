from fastapi import APIRouter, HTTPException, Depends
from typing import List
from database import get_supabase
from schemas import User, UserCreate

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/family/{family_name}", response_model=List[User])
def get_family_users(family_name: str):
    """
    根据家庭名称获取同家庭的所有用户
    """
    supabase = get_supabase()
    response = supabase.table("User").select("*").eq("familyName", family_name).execute()
    
    users = []
    for data in response.data:
        if "familyName" in data:
            data["family_name"] = data.pop("familyName")
        users.append(data)
    return users

@router.get("/{uid}", response_model=User)
def get_user(uid: str):
    """
    根据用户 ID 获取用户信息
    """
    supabase = get_supabase()
    response = supabase.table("User").select("*").eq("uid", uid).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="User not found")
    data = response.data[0]
    if "familyName" in data:
        data["family_name"] = data.pop("familyName")
    return data

@router.post("/", response_model=User)
def create_or_update_user(user: UserCreate):
    """
    创建或更新当前用户信息
    """
    supabase = get_supabase()
    user_data = user.model_dump()
    user_data["familyName"] = user_data.pop("family_name")
    response = supabase.table("User").upsert(user_data).execute()
    if not response.data:
        raise HTTPException(status_code=500, detail="Failed to upsert user")
    
    data = response.data[0]
    if "familyName" in data:
        data["family_name"] = data.pop("familyName")
    return data
