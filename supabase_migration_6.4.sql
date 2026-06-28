-- Tambahkan kolom esensial ke tabel orders untuk fitur dasbor rahasia
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS magic_token TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS expired_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS qr_code_url TEXT;
