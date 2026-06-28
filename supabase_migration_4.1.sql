-- Tambahkan kolom data_content dan foto_urls ke tabel orders
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS data_content JSONB,
ADD COLUMN IF NOT EXISTS foto_urls JSONB;
