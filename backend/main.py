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

# 注册路由
app.include_router(users.router)
app.include_router(orders.router)
app.include_router(favorites.router)

@app.get("/")
def root():
    return {"message": "Welcome to Family Order API"}
