-- ==============================================================================
-- INVITEA.CARDS — MIGRATION V2 (REVISI PENYEMPURNAAN FASE 1)
-- Menambahkan: Exclusive Gatekeeper, Canvas Editor flag, Payout proof & RPC
-- Jalankan script ini di Supabase SQL Editor.
-- ==============================================================================

-- 1. Tambah kolom gatekeeper & canvas ke tabel invitations
ALTER TABLE public.invitations 
ADD COLUMN IF NOT EXISTS is_private_gate boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS is_canvas_editor boolean DEFAULT false;

-- 2. Tambah kolom bukti payout & catatan ke tabel referral_commissions
ALTER TABLE public.referral_commissions
ADD COLUMN IF NOT EXISTS payout_proof_url text,
ADD COLUMN IF NOT EXISTS payout_notes text;

-- 3. Fungsi Keamanan Verifikasi 4-Digit HP Tamu (Aman dari Inspect Element)
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
