"use client";

import { use, useEffect, useState } from "react";
import MagicalLanternsTemplate from "@/components/templates/renderers/magical-lanterns";
import IvoryLineTemplate from "@/components/templates/renderers/ivory-line";
import MemoryLaneTemplate from "@/components/templates/renderers/memory-lane";
import FolioBloomTemplate from "@/components/templates/renderers/folio-bloom";
import WhisperingBloomTemplate from "@/components/templates/renderers/whispering-bloom";
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
  const isMemoryLane = templates?.id === "45f4eb4d-ddab-410d-9104-401e2147f24e" || templates?.nama === "Memory Lane";
  const isFolioBloom = templates?.id === "50e18d6a-5c21-4f18-a6d1-123456789abc" || templates?.nama === "Folio Bloom";
  const isWhisperingBloom = templates?.nama === "Whispering Bloom";

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
  } else if (isMemoryLane) {
    templateData = {
      ...templateData,
      ...data_content
    };
  } else if (isFolioBloom) {
    templateData = {
      ...templateData,
      ...data_content
    };
  } else if (isWhisperingBloom) {
    templateData = {
      ...templateData,
      ...data_content
    };
  } else {
    // Fallback if no matching template
    templateData = {
      ...templateData,
      ...data_content
    };
  }

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-stone-900">
      {isIvoryLine ? (
        <IvoryLineTemplate data={templateData} isPreview={false} />
      ) : isMemoryLane ? (
        <MemoryLaneTemplate data={templateData} />
      ) : isFolioBloom ? (
        <FolioBloomTemplate data={templateData} />
      ) : isWhisperingBloom ? (
        <WhisperingBloomTemplate data={templateData} />
      ) : isMagicalLanterns ? (
        <MagicalLanternsTemplate data={templateData} isPreview={false} />
      ) : (
        <div className="flex items-center justify-center min-h-screen text-white">
          Template tidak ditemukan
        </div>
      )}
    </div>
  );
}
