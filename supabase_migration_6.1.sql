-- Tambahkan kolom slug ke tabel orders
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
