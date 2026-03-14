import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api import users, orders, favorites

app = FastAPI(title="家庭点餐 API", description="前后端一体化家庭点餐后端", version="1.0.0")

# 配置 CORS，允许前端本地开发跨域
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 线上环境需指定特定域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由 - 统一使用 /api 前缀
# 我们不在路由器内部带前缀，而是统一在 include_router 时加上，这样更清晰
app.include_router(users.router, prefix="/api")
app.include_router(orders.router, prefix="/api")
app.include_router(favorites.router, prefix="/api")

@app.get("/api/health")
@app.get("/health")
def health_check():
    from .database import get_supabase
    try:
        supabase = get_supabase()
        # 尝试进行一个超轻量级的查询
        supabase.table("User").select("count").limit(1).execute()
        db_status = "connected"
    except Exception as e:
        db_status = f"error: {str(e)}"
    
    return {
        "status": "online",
        "database": db_status,
        "environment": {
            "has_url": bool(os.getenv("SUPABASE_URL")),
            "has_key": bool(os.getenv("SUPABASE_KEY"))
        }
    }

@app.get("/api")
@app.get("/")
def root():
    return {"message": "Welcome to Family Order API", "status": "online"}
