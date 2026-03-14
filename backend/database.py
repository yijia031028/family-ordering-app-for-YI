import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")

# We avoid crashing if variables are missing to allow the app to boot up and display a clear error or mock data
try:
    if SUPABASE_URL and SUPABASE_KEY:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    else:
        supabase = None
except Exception as e:
    print(f"Failed to initialize Supabase client: {e}")
    supabase = None

def get_supabase() -> Client:
    if not supabase:
        raise Exception("Supabase is not configured. Please set SUPABASE_URL and SUPABASE_KEY.")
    return supabase
