import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import BuatOrderClient from "./BuatOrderClient";
import { DUMMY_TEMPLATES } from "@/lib/templates-data";

export async function generateMetadata(props) {
  const params = await props.params;
  return {
    title: `Lengkapi Informasi - Invitea`,
  };
}

export default async function BuatOrderPage(props) {
  const params = await props.params;
  const { "template-id": templateId } = params;

  let template = null;

  try {
    const { data } = await supabase
      .from('templates')
      .select('*')
      .eq('id', templateId)
      .single();
    if (data) template = data;
  } catch (error) {
    // Ignore error if not found in supabase, fallback to dummy
  }

  // Fallback to dummy data
  if (!template) {
    template = DUMMY_TEMPLATES.find(t => t.id === templateId);
  }

  if (!template) {
    notFound();
  }

  // Tambahkan field email jika belum ada di config (agar selalu diminta)
  const hasEmail = template.fields_config.some(f => f.name === "email");
  if (!hasEmail) {
    template.fields_config = [
      {
        name: "email",
        label: "Alamat Email Anda",
        type: "email",
        placeholder: "Contoh: budi@gmail.com",
        required: true
      },
      ...template.fields_config
    ];
  }

  return <BuatOrderClient template={template} />;
}
