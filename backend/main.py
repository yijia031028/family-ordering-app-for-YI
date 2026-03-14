from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

try:
    from backend.api import users, orders, favorites
except ImportError:
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

# 注册路由 - 为了保证无论是本地直接运行还是通过 Vercel 路由都能正确匹配
app.include_router(users.router, prefix="/api")
app.include_router(orders.router, prefix="/api")
app.include_router(favorites.router, prefix="/api")

# 重复注册不带前缀的路由，以防 Vercel 剥离了 /api 路径
app.include_router(users.router)
app.include_router(orders.router)
app.include_router(favorites.router)

@app.get("/api")
@app.get("/")
def root():
    return {"message": "Welcome to Family Order API", "status": "online"}
