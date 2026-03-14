from fastapi import APIRouter, HTTPException, Depends
from typing import List
from database import get_supabase
from schemas import OrderCreate, OrderResponse, OrderUpdate

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.get("/", response_model=List[OrderResponse])
def get_orders():
    """
    获取家庭的点餐列表
    """
    supabase = get_supabase()
    # Assuming family context is filtered or fetched, here we fetch all for simplicity
    response = supabase.table("Order").select("*").order("created_at", desc=True).execute()
    
    # Map fields
    orders = []
    for data in response.data:
        # DB fields might be snake_case or camelCase, align to schema
        # If DB uses camelCase (as in original blueprint)
        mapped = {
            "id": data.get("id"),
            "dish_id": data.get("dishId"),
            "dish_name": data.get("dishName"),
            "dish_image": data.get("dishImage"),
            "ordered_by": data.get("orderedBy") or data.get("userName"),
            "tags": data.get("tags") or [],
            "notes": data.get("notes") or "",
            "status": data.get("status", "待制作"),
            "time": data.get("time", "刚刚"),
            "created_at": data.get("created_at")
        }
        orders.append(mapped)
    return orders

@router.post("/", response_model=OrderResponse)
def create_order(order: OrderCreate):
    """
    创建一个新的点餐
    """
    supabase = get_supabase()
    
    # Map schema to DB fields
    order_data = {
        "dishId": order.dish_id,
        "dishName": order.dish_name,
        "dishImage": order.dish_image,
        "orderedBy": order.ordered_by,
        "userName": order.ordered_by, 
        "tags": order.tags,
        "notes": order.notes,
        "status": "待制作",
        "time": "刚刚"
    }

    response = supabase.table("Order").insert(order_data).execute()
    if not response.data:
        raise HTTPException(status_code=500, detail="Failed to create order")
    
    data = response.data[0]
    mapped = {
            "id": data.get("id"),
            "dish_id": data.get("dishId"),
            "dish_name": data.get("dishName"),
            "dish_image": data.get("dishImage"),
            "ordered_by": data.get("orderedBy") or data.get("userName"),
            "tags": data.get("tags") or [],
            "notes": data.get("notes") or "",
            "status": data.get("status", "待制作"),
            "time": data.get("time", "刚刚"),
            "created_at": data.get("created_at")
        }
    return mapped

@router.patch("/{order_id}/status", response_model=OrderResponse)
def update_order_status(order_id: str, payload: OrderUpdate):
    """
    更新订单状态
    """
    supabase = get_supabase()
    response = supabase.table("Order").update({"status": payload.status}).eq("id", order_id).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Order not found")
        
    data = response.data[0]
    mapped = {
        "id": data.get("id"),
        "dish_id": data.get("dishId"),
        "dish_name": data.get("dishName"),
        "dish_image": data.get("dishImage"),
        "ordered_by": data.get("orderedBy") or data.get("userName"),
        "tags": data.get("tags") or [],
        "notes": data.get("notes") or "",
        "status": data.get("status", "待制作"),
        "time": data.get("time", "刚刚"),
        "created_at": data.get("created_at")
    }
    return mapped
