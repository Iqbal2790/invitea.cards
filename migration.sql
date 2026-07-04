-- Hapus tabel lama (beserta constraint rsvp_responses yang bergantung)
DROP TABLE IF EXISTS public.rsvp_responses CASCADE;
DROP TABLE IF EXISTS public.invitations CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;

-- Buat ulang tabel orders yang sudah digabung
CREATE TABLE public.orders (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    email text NOT NULL,
    template_id uuid REFERENCES public.templates(id) ON DELETE RESTRICT,
    status_payment text DEFAULT 'pending',
    midtrans_id text,
    slug text UNIQUE,
    magic_token text UNIQUE,
    data_content jsonb DEFAULT '{}',
    foto_urls text[] DEFAULT '{}',
    expired_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now()
);

-- Buat ulang tabel rsvp_responses, berelasi dengan orders(id)
CREATE TABLE public.rsvp_responses (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
    nama_tamu text NOT NULL,
    status_kehadiran text NOT NULL,
    jumlah_tamu integer DEFAULT 1,
    pesan text,
    created_at timestamp with time zone DEFAULT now()
);

-- Aktifkan RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Tambahkan policy untuk orders
CREATE POLICY "Public can insert orders" 
ON public.orders FOR INSERT TO public 
WITH CHECK (true);

CREATE POLICY "Public can view own order by token" 
ON public.orders FOR SELECT TO public 
USING (true);

CREATE POLICY "Public can update own order by token" 
ON public.orders FOR UPDATE TO public 
USING (true);

-- Tambahkan policy untuk rsvp
CREATE POLICY "Public can view rsvp" 
ON public.rsvp_responses FOR SELECT TO public 
USING (true);

CREATE POLICY "Public can insert rsvp" 
ON public.rsvp_responses FOR INSERT TO public 
WITH CHECK (true);
