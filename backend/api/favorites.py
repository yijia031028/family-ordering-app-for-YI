from fastapi import APIRouter, HTTPException, Depends
from typing import List
from database import get_supabase
from schemas import FavoriteCreate, FavoriteResponse

router = APIRouter(prefix="/favorites", tags=["Favorites"])

@router.get("/{user_id}", response_model=List[FavoriteResponse])
def get_user_favorites(user_id: str):
    """
    获取指定用户的收藏菜品 ID 列表
    """
    supabase = get_supabase()
    response = supabase.table("Favorite").select("*").eq("user_id", user_id).execute()
    return response.data

@router.post("/", response_model=FavoriteResponse)
def add_favorite(favorite: FavoriteCreate):
    """
    添加收藏
    """
    supabase = get_supabase()
    fav_data = favorite.model_dump()
    
    # Check if exists
    existing = supabase.table("Favorite").select("*").eq("user_id", fav_data["user_id"]).eq("dish_id", fav_data["dish_id"]).execute()
    if existing.data:
        return existing.data[0]
        
    response = supabase.table("Favorite").insert(fav_data).execute()
    if not response.data:
        raise HTTPException(status_code=500, detail="Failed to add favorite")
    return response.data[0]

@router.delete("/{user_id}/{dish_id}")
def remove_favorite(user_id: str, dish_id: str):
    """
    取消收藏
    """
    supabase = get_supabase()
    response = supabase.table("Favorite").delete().eq("user_id", user_id).eq("dish_id", dish_id).execute()
    return {"message": "success"}
