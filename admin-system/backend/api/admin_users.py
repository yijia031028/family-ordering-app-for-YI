import sys
from pathlib import Path
from typing import List
from fastapi import APIRouter, HTTPException

# Reuse local database.py
from database import get_supabase

router = APIRouter()

@router.get("/users", response_model=List[dict])
async def get_all_users():
    supabase = get_supabase()
    result = supabase.table("User").select("*").execute()
    return result.data
