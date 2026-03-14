-- SQL Schema for Family Order App using Supabase PostgreSQL

-- Create User Table
CREATE TABLE IF NOT EXISTS public."User" (
    "uid" text PRIMARY KEY,
    "name" text NOT NULL,
    "avatar" text NOT NULL,
    "familyName" text NOT NULL,
    "role" text DEFAULT 'member',
    "created_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Order Table
CREATE TABLE IF NOT EXISTS public."Order" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "dishId" text NOT NULL,
    "dishName" text NOT NULL,
    "dishImage" text NOT NULL,
    "orderedBy" text NOT NULL,
    "userName" text NOT NULL,
    "tags" text[] DEFAULT '{}'::text[],
    "notes" text DEFAULT '',
    "status" text DEFAULT '待制作',
    "time" text DEFAULT '刚刚',
    "created_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Favorite Table
CREATE TABLE IF NOT EXISTS public."Favorite" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "user_id" text NOT NULL,
    "dish_id" text NOT NULL,
    "created_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE("user_id", "dish_id")
);

-- Set Row Level Security (RLS) policies if needed (Optional for standard backend access)
-- Note: Since we are using FastAPI with the Supabase Service Role key or backend client, 
-- RLS can be bypassed. However, it's good practice to secure the tables if accessed directly from the frontend later.
-- ALl tables allow all since we act from backend right now.

ALTER TABLE public."User" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow All operations for anon and authenticated on User" ON public."User" FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE public."Order" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow All operations for anon and authenticated on Order" ON public."Order" FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE public."Favorite" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow All operations for anon and authenticated on Favorite" ON public."Favorite" FOR ALL USING (true) WITH CHECK (true);

-- Create Dish Table
CREATE TABLE IF NOT EXISTS public."Dish" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "name" text NOT NULL,
    "category" text NOT NULL,
    "image" text NOT NULL,
    "tags" text[] DEFAULT '{}'::text[],
    "chefNote" text DEFAULT '',
    "ingredients" jsonb DEFAULT '[]'::jsonb,
    "created_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public."Dish" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow All operations for anon and authenticated on Dish" ON public."Dish" FOR ALL USING (true) WITH CHECK (true);
