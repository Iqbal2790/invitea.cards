-- ==============================================================================
-- INVITEA.CARDS — UNIFIED REBUILD SCHEMA (SUPABASE POSTGRESQL)
-- Versi: 2.0 (Rebuild: Bespoke Studio + Wedding Planner + Freemium + Affiliate)
-- Tanggal: 2026-10-08
-- ==============================================================================

-- ⚠️ PERINGATAN: SCRIPT INI AKAN MERESET DAN MENGHAPUS SEMUA TABEL LAMA.
-- JALANKAN DI SUPABASE SQL EDITOR UNTUK MEMULAI ARSITEKTUR BERSIH.

-- ==============================================================================
-- 1. BERSIHKAN TABEL LAMA (CLEAN RESET)
-- ==============================================================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

DROP TABLE IF EXISTS public.referral_commissions CASCADE;
DROP TABLE IF EXISTS public.referral_codes CASCADE;
DROP TABLE IF EXISTS public.affiliates CASCADE;
DROP TABLE IF EXISTS public.budget_items CASCADE;
DROP TABLE IF EXISTS public.checklist_items CASCADE;
DROP TABLE IF EXISTS public.guests CASCADE;
DROP TABLE IF EXISTS public.custom_domains CASCADE;
DROP TABLE IF EXISTS public.invitations CASCADE;
DROP TABLE IF EXISTS public.wedding_projects CASCADE;
DROP TABLE IF EXISTS public.templates CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Hapus tabel warisan versi 1.0 jika masih ada
DROP TABLE IF EXISTS public.rsvp_responses CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.admins CASCADE;

-- Pastikan extension UUID aktif
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. TABEL PROFILES (TERHUBUNG KE SUPABASE AUTH GOOGLE)
-- ==============================================================================
CREATE TABLE public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email text NOT NULL,
    full_name text,
    avatar_url text,
    role text DEFAULT 'customer', -- 'customer' | 'admin'
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Trigger otomatis membuat profile saat user login/signup via Google OAuth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
        COALESCE(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture', '')
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        avatar_url = EXCLUDED.avatar_url,
        updated_at = now();
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT OR UPDATE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 3. TABEL WEDDING_PROJECTS (SENTRAL RETENSI WEDDING PLANNER)
-- ==============================================================================
CREATE TABLE public.wedding_projects (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    groom_name text NOT NULL DEFAULT '',
    bride_name text NOT NULL DEFAULT '',
    wedding_date date,
    wedding_city text DEFAULT '',
    tier text NOT NULL DEFAULT 'paid_template', -- 'paid_template' | 'custom_design'
    total_budget numeric DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ==============================================================================
-- 4. TABEL TEMPLATES (KATALOG TEMPLATE UNDANGAN)
-- ==============================================================================
CREATE TABLE public.templates (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    slug text UNIQUE NOT NULL,
    nama text NOT NULL,
    kategori text NOT NULL DEFAULT 'wedding', -- 'wedding' | 'greeting'
    is_free boolean DEFAULT false,
    harga numeric DEFAULT 0,
    thumbnail_url text,
    description text,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

-- ==============================================================================
-- 5. TABEL INVITATIONS (DATA UNDANGAN DIGITAL / BESPOKE)
-- ==============================================================================
CREATE TABLE public.invitations (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id uuid REFERENCES public.wedding_projects(id) ON DELETE CASCADE, -- NULL untuk Free Tier (No-Login)
    template_id uuid REFERENCES public.templates(id) ON DELETE RESTRICT,
    slug text UNIQUE NOT NULL,
    is_custom_design boolean DEFAULT false,
    is_free_tier boolean DEFAULT false,
    is_private_gate boolean DEFAULT false, -- Toggle Exclusive Gatekeeper
    is_canvas_editor boolean DEFAULT false, -- Penanda Canva-like Drag & Drop
    content_data jsonb NOT NULL DEFAULT '{}',
    gallery_urls text[] DEFAULT '{}',
    music_url text,
    expires_at timestamptz NOT NULL, -- Free: +7 hari, Paid: +30 hari, Custom: +365 hari
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ==============================================================================
-- 6. TABEL CUSTOM_DOMAINS (DEDICATED DOMAIN UNTUK BESPOKE STUDIO)
-- ==============================================================================
CREATE TABLE public.custom_domains (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id uuid NOT NULL REFERENCES public.wedding_projects(id) ON DELETE CASCADE,
    invitation_id uuid NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
    domain text UNIQUE NOT NULL, -- cth: 'andi-maya.my.id'
    status text DEFAULT 'active', -- 'pending_dns' | 'active' | 'expired'
    created_at timestamptz DEFAULT now()
);

-- ==============================================================================
-- 7. TABEL GUESTS (DAFTAR TAMU TERPADU & LIVE RSVP SYNC)
-- ==============================================================================
CREATE TABLE public.guests (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id uuid NOT NULL REFERENCES public.wedding_projects(id) ON DELETE CASCADE,
    name text NOT NULL,
    group_name text DEFAULT 'Teman', -- 'Keluarga' | 'VIP' | 'Teman' | 'Rekan Kerja'
    phone text,
    slug_token text, -- Token identifikasi link tamu: ?to=Budi
    pax_invited int DEFAULT 1,
    rsvp_status text DEFAULT 'pending', -- 'pending' | 'attending' | 'declined'
    rsvp_pax int DEFAULT 0,
    rsvp_wishes text,
    rsvp_at timestamptz,
    created_at timestamptz DEFAULT now()
);

-- ==============================================================================
-- 8. TABEL CHECKLIST_ITEMS (WEDDING PLANNER TO-DO LIST)
-- ==============================================================================
CREATE TABLE public.checklist_items (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id uuid NOT NULL REFERENCES public.wedding_projects(id) ON DELETE CASCADE,
    title text NOT NULL,
    category text DEFAULT 'General', -- 'Venue' | 'Attire' | 'Catering' | 'Dokumentasi' | dll
    due_timeline text, -- 'H-6 Bulan', 'H-3 Bulan', 'H-1 Bulan', 'H-1 Minggu'
    is_completed boolean DEFAULT false,
    notes text,
    created_at timestamptz DEFAULT now()
);

-- ==============================================================================
-- 9. TABEL BUDGET_ITEMS (WEDDING PLANNER EXPENSE TRACKER)
-- ==============================================================================
CREATE TABLE public.budget_items (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id uuid NOT NULL REFERENCES public.wedding_projects(id) ON DELETE CASCADE,
    category text NOT NULL, -- 'Venue', 'Catering', 'MUA & Gaun', 'Fotografi', dll
    estimated_cost numeric DEFAULT 0,
    actual_cost numeric DEFAULT 0,
    paid_amount numeric DEFAULT 0,
    vendor_name text,
    is_paid_off boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- ==============================================================================
-- 10. TABEL SISTEM AFILIASI & REFERRAL (DISKON 20% & KOMISI 20%)
-- ==============================================================================
CREATE TABLE public.affiliates (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    nama text NOT NULL,
    whatsapp text NOT NULL,
    bank_name text,
    bank_account_number text,
    bank_account_name text,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE public.referral_codes (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    affiliate_id uuid NOT NULL REFERENCES public.affiliates(id) ON DELETE CASCADE,
    code text UNIQUE NOT NULL, -- Misal: 'WOBAHAGIA' (Uppercase)
    discount_percent numeric DEFAULT 20,
    commission_percent numeric DEFAULT 20,
    total_uses int DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE public.referral_commissions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    referral_code_id uuid NOT NULL REFERENCES public.referral_codes(id) ON DELETE RESTRICT,
    invitation_id uuid REFERENCES public.invitations(id) ON DELETE SET NULL,
    order_id text,
    base_price numeric NOT NULL,
    discount_amount numeric NOT NULL, -- 20% dari base_price
    commission_amount numeric NOT NULL, -- 20% dari base_price
    payout_status text DEFAULT 'pending', -- 'pending' | 'paid'
    payout_proof_url text, -- Bukti slip transfer bank/flip
    payout_notes text, -- Nomor referensi bank / catatan
    paid_at timestamptz,
    created_at timestamptz DEFAULT now()
);

-- ==============================================================================
-- 10.1 RPC FUNCTION: VERIFIKASI 4-DIGIT HP TAMU (SECURITY DEFINER)
-- ==============================================================================
-- Memverifikasi 4 digit terakhir nomor WhatsApp tanpa mengekspos nomor HP ke browser
CREATE OR REPLACE FUNCTION public.verify_guest_gatekeeper(
    p_invitation_slug text,
    p_token text,
    p_last_4_digits text
)
RETURNS jsonb AS $$
DECLARE
    v_guest record;
BEGIN
    SELECT g.id, g.name, g.group_name, g.pax_invited, g.rsvp_status
    INTO v_guest
    FROM public.guests g
    JOIN public.invitations inv ON inv.project_id = g.project_id
    WHERE inv.slug = p_invitation_slug
      AND (g.slug_token = p_token OR p_token IS NULL)
      AND RIGHT(REGEXP_REPLACE(g.phone, '\D', '', 'g'), 4) = p_last_4_digits
    LIMIT 1;

    IF FOUND THEN
        RETURN json_build_object(
            'success', true, 
            'guest_id', v_guest.id, 
            'guest_name', v_guest.name,
            'group_name', v_guest.group_name
        );
    ELSE
        RETURN json_build_object('success', false, 'message', 'Nomor tidak sesuai');
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ==============================================================================
-- 11. INDEXES OPTIMASI PERFORMA QUERY EDGE
-- ==============================================================================
CREATE INDEX idx_invitations_slug ON public.invitations (slug);
CREATE INDEX idx_invitations_project_id ON public.invitations (project_id);
CREATE INDEX idx_custom_domains_domain ON public.custom_domains (domain);
CREATE INDEX idx_guests_project_id ON public.guests (project_id);
CREATE INDEX idx_guests_slug_token ON public.guests (slug_token);
CREATE INDEX idx_checklist_project_id ON public.checklist_items (project_id);
CREATE INDEX idx_budget_project_id ON public.budget_items (project_id);
CREATE INDEX idx_referral_codes_code ON public.referral_codes (UPPER(code));

-- ==============================================================================
-- 12. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_commissions ENABLE ROW LEVEL SECURITY;

-- 12.1 PROFILES: User dapat membaca & mengupdate profil mereka sendiri
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE TO authenticated USING (auth.uid() = id);

-- 12.2 TEMPLATES: Publik dapat melihat template aktif
CREATE POLICY "Public can view active templates" ON public.templates
    FOR SELECT TO public USING (is_active = true);

-- 12.3 WEDDING PROJECTS: Hanya pemilik yang dapat mengelola project-nya
CREATE POLICY "Owners can view own projects" ON public.wedding_projects
    FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Owners can insert own projects" ON public.wedding_projects
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owners can update own projects" ON public.wedding_projects
    FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Owners can delete own projects" ON public.wedding_projects
    FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- 12.4 INVITATIONS:
-- Publik dapat melihat undangan yang belum expired
CREATE POLICY "Public can view active invitations" ON public.invitations
    FOR SELECT TO public USING (expires_at > now());
-- Pemilik project dapat mengupdate undangan miliknya
CREATE POLICY "Owners can manage own invitations" ON public.invitations
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.wedding_projects wp
            WHERE wp.id = invitations.project_id AND wp.user_id = auth.uid()
        )
    );

-- 12.5 CUSTOM DOMAINS: Publik read untuk router Cloudflare
CREATE POLICY "Public can lookup active custom domains" ON public.custom_domains
    FOR SELECT TO public USING (status = 'active');

-- 12.6 GUESTS:
-- Pemilik project memiliki kontrol penuh atas daftar tamu
CREATE POLICY "Owners can manage own guests" ON public.guests
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.wedding_projects wp
            WHERE wp.id = guests.project_id AND wp.user_id = auth.uid()
        )
    );

-- 12.7 CHECKLIST & BUDGET ITEMS: Hanya pemilik project
CREATE POLICY "Owners can manage own checklists" ON public.checklist_items
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.wedding_projects wp
            WHERE wp.id = checklist_items.project_id AND wp.user_id = auth.uid()
        )
    );

CREATE POLICY "Owners can manage own budgets" ON public.budget_items
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.wedding_projects wp
            WHERE wp.id = budget_items.project_id AND wp.user_id = auth.uid()
        )
    );

-- 12.8 REFERRAL CODES: Publik dapat memvalidasi kode aktif saat checkout
CREATE POLICY "Public can check active referral codes" ON public.referral_codes
    FOR SELECT TO public USING (is_active = true);

-- ==============================================================================
-- 13. SEED DATA AWAL (OPTIONAL / TESTING)
-- ==============================================================================
-- Tabel templates dibiarkan KOSONG (bersih dari data template lama).
-- Template baru akan didaftarkan nanti sesuai kurasi baru.

INSERT INTO public.affiliates (nama, whatsapp, bank_name, bank_account_number, bank_account_name) VALUES
('Official Invitea Partner', '6281234567890', 'BCA', '1234567890', 'Admin Invitea')
ON CONFLICT DO NOTHING;

INSERT INTO public.referral_codes (affiliate_id, code, discount_percent, commission_percent)
SELECT id, 'INVITEABARU', 20, 20 FROM public.affiliates WHERE nama = 'Official Invitea Partner' LIMIT 1
ON CONFLICT (code) DO NOTHING;

-- ==============================================================================
-- 14. INISIALISASI BUCKET SUPABASE STORAGE (BUCKETS & POLICIES)
-- ==============================================================================
-- Catatan: Untuk menghapus file lama di storage, gunakan menu 'Storage' di 
-- Dashboard Supabase (klik titik tiga pada bucket -> 'Empty bucket' / 'Delete bucket')
-- karena Supabase memproteksi penghapusan langsung via SQL untuk mencegah orphan files.

-- Membuat bucket baru untuk arsitektur rebuild
INSERT INTO storage.buckets (id, name, public) VALUES
('invitation-assets', 'invitation-assets', true),
('thumbnails', 'thumbnails', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Kebijakan akses Storage: Siapapun dapat membaca (Public Read)
DROP POLICY IF EXISTS "Public read invitation-assets" ON storage.objects;
DROP POLICY IF EXISTS "Public read thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Access for orders" ON storage.objects;
DROP POLICY IF EXISTS "Public Access for thumbnails" ON storage.objects;

CREATE POLICY "Public read invitation-assets" ON storage.objects
    FOR SELECT TO public USING (bucket_id = 'invitation-assets');

CREATE POLICY "Public read thumbnails" ON storage.objects
    FOR SELECT TO public USING (bucket_id = 'thumbnails');



