"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, Pause } from 'lucide-react';

export default function AudioPlayer({ src, isPlaying }) {
  const [playing, setPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const iframeRef = useRef(null);
  
  // Ekstrak Video ID dari URL YouTube
  const videoIdMatch = src?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  useEffect(() => {
    if (isPlaying) {
      setHasStarted(true);
      setPlaying(true);
    }
  }, [isPlaying]);

  useEffect(() => {
    // Gunakan postMessage untuk play/pause setelah iframe dimuat
    if (hasStarted && iframeRef.current && iframeRef.current.contentWindow) {
      const func = playing ? 'playVideo' : 'pauseVideo';
      iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: func, args: [] }), '*');
    }
  }, [playing, hasStarted]);

  const togglePlay = () => {
    setPlaying(!playing);
  };

  if (!videoId) return null;

  return (
    <>
      {hasStarted && (
        <div className="fixed top-0 left-0 w-1 h-1 opacity-[0.01] pointer-events-none -z-50 overflow-hidden">
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&playsinline=1&autoplay=1`}
            allow="autoplay"
            className="w-full h-full"
          />
        </div>
      )}

      {/* Floating Button */}
      {isPlaying && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          onClick={togglePlay}
          className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-2xl transition-all duration-300 ${playing ? 'bg-white/90 text-primary' : 'bg-primary/90 text-white'}`}
          style={{ backdropFilter: 'blur(8px)' }}
        >
          {playing ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
              <Music size={24} />
            </motion.div>
          ) : (
            <Pause size={24} />
          )}
        </motion.button>
      )}
    </>
  );
}
