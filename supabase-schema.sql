-- Supabase Schema for Invitea

-- ==========================================
-- (OPSIONAL) RESET DATABASE
-- Hapus tanda komentar (--) pada baris DROP di bawah ini HANYA JIKA Anda ingin 
-- menghapus tabel lama yang sudah ada dan membuat ulang dari awal.
-- Peringatan: Ini akan menghapus semua data yang ada di dalam tabel tersebut!
-- ==========================================
DROP TABLE IF EXISTS public.rsvp_responses CASCADE;
DROP TABLE IF EXISTS public.invitations CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.templates CASCADE;
DROP TABLE IF EXISTS public.admins CASCADE;

-- 1. Tabel `templates`
CREATE TABLE public.templates (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    nama text NOT NULL,
    kategori text NOT NULL, -- 'undangan' atau 'ucapan'
    harga numeric NOT NULL,
    thumbnail_url text,
    fields_config jsonb NOT NULL,
    fitur_maps boolean DEFAULT false,
    fitur_countdown boolean DEFAULT false,
    fitur_rsvp boolean DEFAULT false,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now()
);

-- 2. Tabel `orders` (Gabungan dengan invitations lama)
CREATE TABLE public.orders (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    email text NOT NULL,
    template_id uuid REFERENCES public.templates(id) ON DELETE RESTRICT,
    status_payment text DEFAULT 'pending', -- pending/paid/failed
    midtrans_id text,
    slug text UNIQUE,
    magic_token text UNIQUE,
    data_content jsonb DEFAULT '{}',
    foto_urls text[] DEFAULT '{}',
    expired_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now()
);

-- 3. Tabel `rsvp_responses`
CREATE TABLE public.rsvp_responses (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
    nama_tamu text NOT NULL,
    hadir boolean NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

-- 5. Tabel `admins`
CREATE TABLE public.admins (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    email text UNIQUE NOT NULL,
    password_hash text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS for all tables
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvp_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- 1. templates: Anyone can read active templates
CREATE POLICY "Templates are viewable by everyone" ON public.templates
    FOR SELECT USING (is_active = true);

-- 2. orders: Anyone can read their own order via slug or magic_token
CREATE POLICY "Orders are viewable by everyone" ON public.orders
    FOR SELECT USING (true);
CREATE POLICY "Public can insert orders" ON public.orders
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update orders" ON public.orders
    FOR UPDATE USING (true);

-- 4. rsvp_responses: Anyone can insert their RSVP (API/Client), anyone can view
CREATE POLICY "Anyone can insert RSVP" ON public.rsvp_responses
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view RSVP" ON public.rsvp_responses
    FOR SELECT USING (true);

-- 5. admins: Server-side only, no public access
-- No policies for public access.

-- ==========================================
-- STORAGE BUCKETS INSTRUCTIONS
-- ==========================================

-- Create 'orders' bucket (Public)
INSERT INTO storage.buckets (id, name, public) VALUES ('orders', 'orders', true) ON CONFLICT (id) DO NOTHING;

-- Create 'thumbnails' bucket (Public)
INSERT INTO storage.buckets (id, name, public) VALUES ('thumbnails', 'thumbnails', true) ON CONFLICT (id) DO NOTHING;

-- Cleanup existing policies just in case to prevent errors
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Access for orders" ON storage.objects;
DROP POLICY IF EXISTS "Public Access for thumbnails" ON storage.objects;

-- Allow public read access to buckets
CREATE POLICY "Public Access for orders" ON storage.objects FOR SELECT USING ( bucket_id = 'orders' );
CREATE POLICY "Public Access for thumbnails" ON storage.objects FOR SELECT USING ( bucket_id = 'thumbnails' );

-- Note: Uploads to 'orders' and 'thumbnails' will be done via Server API Routes using Service Role Key to bypass RLS.
