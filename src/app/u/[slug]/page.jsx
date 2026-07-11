"use client";

import { use, useEffect, useState } from "react";
import ClassicTemplate from "@/components/templates/renderers/classic";
import MagicalLanternsTemplate from "@/components/templates/renderers/magical-lanterns";
import IvoryLineTemplate from "@/components/templates/renderers/ivory-line";
import { Loader2 } from "lucide-react";

export default function LiveInvitationPage({ params }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/u/${slug}`);
        const result = await res.json();
        
        if (!res.ok) throw new Error(result.error || "Gagal mengambil data");
        
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-900 transition-colors duration-400">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-900 text-white">
        <h2 className="text-2xl font-serif italic mb-2">Undangan Tidak Ditemukan</h2>
        <p className="text-stone-400">Tautan undangan tidak valid atau sudah kadaluarsa.</p>
      </div>
    );
  }

  const { data_content, templates, id, rsvps } = data;
  const isMagicalLanterns = templates?.id === "b61395f5-c1ad-486f-add9-cac4bb13d314";
  const isIvoryLine = templates?.id === "8fd87cbb-3273-442b-b9cd-de875f3415ad";

  let templateData = { id: id, rsvps: rsvps || [] };
  if (isMagicalLanterns) {
    templateData = {
      ...templateData,
      ...data_content
    };
  } else if (isIvoryLine) {
    templateData = {
      ...templateData,
      ...data_content
    };
  } else {
    // Map WeddingForm data_content to ClassicTemplate expected data
    let eventDate = data_content?.date || "2026-12-24";
    let eventTime = data_content?.time || "08:00";
    
    templateData = {
      ...templateData,
      groom: data_content?.groomName || "Romeo",
      bride: data_content?.brideName || "Juliet",
      eventDate: `${eventDate}T${eventTime}`,
      locationName: "Lokasi Acara",
      locationAddress: data_content?.location || "Alamat Acara",
    };
  }

  return (
    <div className="min-h-screen bg-stone-900">
      {isIvoryLine ? (
        <IvoryLineTemplate data={templateData} isPreview={false} />
      ) : isMagicalLanterns ? (
        <MagicalLanternsTemplate data={templateData} isPreview={false} />
      ) : (
        <ClassicTemplate data={templateData} isPreview={false} />
      )}
    </div>
  );
}
