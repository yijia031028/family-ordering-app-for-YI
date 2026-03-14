from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import users, orders, favorites

app = FastAPI(title="家庭点餐 API", description="前后端一体化家庭点餐后端", version="1.0.0")

# 配置 CORS，允许前端本地开发跨域
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 线上环境需指定特定域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由 - 为了保证本地和 Vercel 都能正确匹配，我们注册两次或者使用灵活的前缀
# 1. 带 /api 前缀的 (Vercel 可能会传递全路径)
app.include_router(users.router, prefix="/api")
app.include_router(orders.router, prefix="/api")
app.include_router(favorites.router, prefix="/api")

# 2. 不带前缀的 (以防 Vercel 剥离了 /api)
app.include_router(users.router)
app.include_router(orders.router)
app.include_router(favorites.router)

@app.get("/api")
@app.get("/")
def root():
    return {"message": "Welcome to Family Order API", "status": "online"}
