from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    uid: str
    name: str
    avatar: str
    family_name: str
    role: Optional[str] = "member"

class UserCreate(UserBase):
    pass

class User(UserBase):
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    dish_id: str
    dish_name: str
    dish_image: str
    ordered_by: str
    tags: List[str] = []
    notes: Optional[str] = ""

class OrderCreate(OrderBase):
    pass

class OrderUpdate(BaseModel):
    status: str

class OrderResponse(OrderBase):
    id: str
    status: str
    time: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class FavoriteBase(BaseModel):
    user_id: str
    dish_id: str

class FavoriteCreate(FavoriteBase):
    pass

class FavoriteResponse(FavoriteBase):
    id: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
