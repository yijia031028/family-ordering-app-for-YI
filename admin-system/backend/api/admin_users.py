import sys
from pathlib import Path
from typing import List
from fastapi import APIRouter, HTTPException

# Reuse database from parent backend
parent_backend = Path(__file__).resolve().parent.parent.parent / "backend"
if str(parent_backend) not in sys.path:
    sys.path.append(str(parent_backend))

from database import get_supabase

router = APIRouter()

@router.get("/users", response_model=List[dict])
async def get_all_users():
    supabase = get_supabase()
    result = supabase.table("User").select("*").execute()
    return result.data
