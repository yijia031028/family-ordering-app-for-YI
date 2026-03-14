import os
import sys
from pathlib import Path
from typing import List
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel

# Add root backend to path to reuse database.py if possible, 
# but per user request to NOT mix, we might want to redefine or import carefully.
# We will import database from the parent backend folder to reuse the Supabase client.
parent_backend = Path(__file__).resolve().parent.parent.parent / "backend"
if str(parent_backend) not in sys.path:
    sys.path.append(str(parent_backend))

from database import get_supabase

router = APIRouter()

class Ingredient(BaseModel):
    name: str
    amount: str

class DishCreate(BaseModel):
    name: str
    category: str
    image: str
    tags: List[str] = []
    chefNote: str = ""
    ingredients: List[Ingredient] = []

@router.post("/dishes", response_model=dict)
async def create_dish(dish: DishCreate):
    supabase = get_supabase()
    data = dish.dict()
    # Convert ingredients to list of dicts for JSONB
    data['ingredients'] = [i.dict() for i in dish.ingredients]
    
    result = supabase.table("Dish").insert(data).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to create dish")
    return result.data[0]

@router.get("/dishes", response_model=List[dict])
async def get_dishes():
    supabase = get_supabase()
    result = supabase.table("Dish").select("*").order("created_at", desc=True).execute()
    return result.data

@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    supabase = get_supabase()
    file_content = await file.read()
    file_path = f"dishes/{file.filename}"
    
    # Upload to 'dishes' bucket
    # Note: User needs to create this bucket manually or we could try to create it
    try:
        res = supabase.storage.from_("dishes").upload(file_path, file_content, {"content-type": file.content_type})
        # Get public URL
        url = supabase.storage.from_("dishes").get_public_url(file_path)
        return {"url": url}
    except Exception as e:
        # If bucket doesn't exist or upload fails
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}. Please ensure 'dishes' bucket exists and is public.")
