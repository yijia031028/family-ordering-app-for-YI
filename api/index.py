import sys
import os

# 将项目根目录添加到系统路径，以便正确引用 backend 包
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from backend.main import app
