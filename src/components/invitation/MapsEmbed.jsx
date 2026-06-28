"use client";

import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

export default function MapsEmbed({ maps_url }) {
  const [embedSrc, setEmbedSrc] = useState("");

  useEffect(() => {
    if (!maps_url) return;

    // Cek apakah url berupa tag iframe penuh
    if (maps_url.includes("<iframe") && maps_url.includes("src=")) {
      const match = maps_url.match(/src="([^"]+)"/);
      if (match && match[1]) {
        setEmbedSrc(match[1]);
      }
    } else {
      // Asumsikan sudah berupa link sumber (meskipun mungkin tidak selalu bisa di-embed langsung tanpa API key)
      // Idealnya user memasukkan link dari fitur "Embed a map" di Google Maps.
      setEmbedSrc(maps_url);
    }
  }, [maps_url]);

  if (!embedSrc) {
    return (
      <div className="w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl flex flex-col items-center justify-center text-gray-500">
        <MapPin className="w-8 h-8 mb-2 opacity-50" />
        <p className="text-sm font-medium">Peta belum tersedia</p>
      </div>
    );
  }

  return (
    <div className="w-full relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <iframe
        src={embedSrc}
        className="w-full aspect-video md:aspect-[21/9]"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps"
      ></iframe>
    </div>
  );
}
