-- Run this script in your Supabase SQL Editor

-- 1. Create the submissions table
CREATE TABLE IF NOT EXISTS public.submissions (
    id TEXT PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL,
    "studentName" TEXT NOT NULL,
    "studentId" TEXT,
    set TEXT NOT NULL,
    language TEXT NOT NULL,
    "overallSeconds" INTEGER,
    "questionSeconds" JSONB,
    answers JSONB
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- 3. Create policies to allow public inserts and selects
-- Allow anyone to submit (insert) data
CREATE POLICY "Allow anonymous inserts" 
ON public.submissions FOR INSERT 
TO anon
WITH CHECK (true);

-- Allow anyone to read (select) data (since admin panel is client-side)
CREATE POLICY "Allow anonymous selects" 
ON public.submissions FOR SELECT 
TO anon
USING (true);
