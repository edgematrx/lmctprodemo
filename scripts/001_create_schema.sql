-- LMCT PRO Database Schema
-- Run this migration to set up all required tables

-- 1. Profiles table (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  dealer_name TEXT NOT NULL DEFAULT 'My Dealership',
  lmct TEXT DEFAULT '',
  abn TEXT DEFAULT '',
  acn TEXT DEFAULT '',
  address TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  website TEXT DEFAULT '',
  manager_pin TEXT DEFAULT '1234',
  warn_margin INTEGER DEFAULT 5,
  min_margin INTEGER DEFAULT 10,
  target_margin INTEGER DEFAULT 18,
  ai_name TEXT DEFAULT 'MAX',
  ai_personality TEXT DEFAULT 'direct',
  ai_training TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- 2. Vehicles table (stock inventory)
CREATE TABLE IF NOT EXISTS public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  colour TEXT DEFAULT '',
  body TEXT DEFAULT 'Sedan',
  transmission TEXT DEFAULT 'Auto',
  fuel TEXT DEFAULT 'Petrol',
  odometer INTEGER DEFAULT 0,
  rego TEXT DEFAULT '',
  rego_expiry DATE,
  vin TEXT DEFAULT '',
  price DECIMAL(12,2) DEFAULT 0,
  purchase_price DECIMAL(12,2) DEFAULT 0,
  recon_cost DECIMAL(12,2) DEFAULT 0,
  other_cost DECIMAL(12,2) DEFAULT 0,
  source TEXT DEFAULT 'Auction',
  acquisition_date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'Available',
  score INTEGER DEFAULT 50,
  notes TEXT DEFAULT '',
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "vehicles_select_own" ON public.vehicles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "vehicles_insert_own" ON public.vehicles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "vehicles_update_own" ON public.vehicles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "vehicles_delete_own" ON public.vehicles FOR DELETE USING (auth.uid() = user_id);

-- 3. Customers table
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  address TEXT DEFAULT '',
  license TEXT DEFAULT '',
  interests TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  hot BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "customers_select_own" ON public.customers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "customers_insert_own" ON public.customers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "customers_update_own" ON public.customers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "customers_delete_own" ON public.customers FOR DELETE USING (auth.uid() = user_id);

-- 4. Sales table
CREATE TABLE IF NOT EXISTS public.sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  -- Vehicle snapshot (in case vehicle is deleted)
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  rego TEXT DEFAULT '',
  -- Sale details
  sale_price DECIMAL(12,2) NOT NULL,
  total_cost DECIMAL(12,2) DEFAULT 0,
  profit DECIMAL(12,2) DEFAULT 0,
  margin DECIMAL(5,2) DEFAULT 0,
  -- Buyer info
  buyer_name TEXT NOT NULL,
  buyer_email TEXT DEFAULT '',
  buyer_phone TEXT DEFAULT '',
  buyer_address TEXT DEFAULT '',
  buyer_license TEXT DEFAULT '',
  -- Dates
  sale_date DATE DEFAULT CURRENT_DATE,
  settlement_date DATE,
  -- Status
  status TEXT DEFAULT 'Completed',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sales_select_own" ON public.sales FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "sales_insert_own" ON public.sales FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "sales_update_own" ON public.sales FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "sales_delete_own" ON public.sales FOR DELETE USING (auth.uid() = user_id);

-- 5. Tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  status TEXT DEFAULT 'todo',
  priority TEXT DEFAULT 'medium',
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tasks_select_own" ON public.tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "tasks_insert_own" ON public.tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "tasks_update_own" ON public.tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "tasks_delete_own" ON public.tasks FOR DELETE USING (auth.uid() = user_id);

-- 6. Chat history table
CREATE TABLE IF NOT EXISTS public.chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chat_select_own" ON public.chat_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "chat_insert_own" ON public.chat_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "chat_delete_own" ON public.chat_history FOR DELETE USING (auth.uid() = user_id);

-- 7. Email settings table
CREATE TABLE IF NOT EXISTS public.email_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  api_key TEXT DEFAULT '',
  sender_email TEXT DEFAULT '',
  sender_name TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.email_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "email_select_own" ON public.email_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "email_insert_own" ON public.email_settings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "email_update_own" ON public.email_settings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "email_delete_own" ON public.email_settings FOR DELETE USING (auth.uid() = user_id);

-- Auto-create profile on signup trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, dealer_name, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'dealer_name', 'My Dealership'),
    new.email
  )
  ON CONFLICT (id) DO NOTHING;

  -- Also create email settings row
  INSERT INTO public.email_settings (user_id)
  VALUES (new.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR each ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_vehicles_user_id ON public.vehicles(user_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON public.vehicles(status);
CREATE INDEX IF NOT EXISTS idx_customers_user_id ON public.customers(user_id);
CREATE INDEX IF NOT EXISTS idx_sales_user_id ON public.sales(user_id);
CREATE INDEX IF NOT EXISTS idx_sales_sale_date ON public.sales(sale_date);
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_chat_user_id ON public.chat_history(user_id);
