"use client";

import { useState, useEffect } from "react";

export default function Countdown({ tanggal_acara, jam_acara }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPast, setIsPast] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (!tanggal_acara) return;

    // Gabungkan tanggal dan jam, default jam 00:00 jika tidak ada
    const targetDateString = `${tanggal_acara}T${jam_acara || "00:00"}:00`;
    const targetDate = new Date(targetDateString).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setIsPast(true);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [tanggal_acara, jam_acara]);

  if (!isMounted) return null; // Mencegah hydration mismatch

  if (isPast) {
    return (
      <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-serif text-gray-800">Acara sudah berlangsung</h3>
        <p className="text-gray-500 mt-2 text-sm">Terima kasih atas doa dan restunya.</p>
      </div>
    );
  }

  const timeBlocks = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-3 md:gap-6">
      {timeBlocks.map((block, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white shadow-md rounded-xl md:rounded-2xl border border-gray-100">
            <span className="text-2xl md:text-3xl font-serif text-gray-800">
              {block.value.toString().padStart(2, "0")}
            </span>
          </div>
          <span className="mt-3 text-xs md:text-sm font-medium text-gray-500 uppercase tracking-widest">
            {block.label}
          </span>
        </div>
      ))}
    </div>
  );
}
