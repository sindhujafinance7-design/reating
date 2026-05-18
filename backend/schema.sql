-- Create the table for customer ratings
CREATE TABLE customer_ratings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comments text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Disable Row Level Security (RLS) so that ratings can be inserted directly from your backend
ALTER TABLE customer_ratings DISABLE ROW LEVEL SECURITY;
