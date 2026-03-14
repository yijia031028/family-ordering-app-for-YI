import sys
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Add current dir to path for internal imports
current_dir = Path(__file__).resolve().parent
if str(current_dir) not in sys.path:
    sys.path.append(str(current_dir))

from api import admin_dishes, admin_users

app = FastAPI(title="家庭点餐后台 API", description="PC端后台管理系统后端", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin_dishes.router, prefix="/api/admin", tags=["Dishes"])
app.include_router(admin_users.router, prefix="/api/admin", tags=["Users"])

@app.get("/api/admin/health")
def health():
    return {"status": "ok", "service": "admin-backend"}

@app.get("/api/admin")
def root():
    return {"message": "Admin API is running"}
