"use client";
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import { Music, Pause } from 'lucide-react';

const AudioPlayer = forwardRef(({ src, isPlaying }, ref) => {
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef(null);
  const audioRef = useRef(null);
  
  // Ekstrak Video ID dari URL YouTube
  const videoIdMatch = src?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  const isNativeAudio = !videoId && src;

  useImperativeHandle(ref, () => ({
    play: () => {
      setPlaying(true);
      if (isNativeAudio && audioRef.current) {
        audioRef.current.play().catch(e => console.log("Autoplay blocked:", e));
      } else if (videoId && iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
      }
    }
  }));

  useEffect(() => {
    if (isPlaying && !playing) {
      setPlaying(true);
    }
  }, [isPlaying]);

  useEffect(() => {
    // Sync external state changes if needed
    if (playing) {
      if (isNativeAudio && audioRef.current) {
        // Only try to play if it's not already playing to avoid overlapping promises
        if (audioRef.current.paused) {
           audioRef.current.play().catch(e => console.log("Autoplay blocked:", e));
        }
      } else if (videoId && iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
      }
    } else {
      if (isNativeAudio && audioRef.current) {
        audioRef.current.pause();
      } else if (videoId && iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*');
      }
    }
  }, [playing, isNativeAudio, videoId]);

  const togglePlay = () => {
    setPlaying(!playing);
  };

  if (!src) return null;

  return (
    <>
      {videoId && (
        <div className="fixed top-0 left-0 w-1 h-1 opacity-[0.01] pointer-events-none -z-50 overflow-hidden">
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&playsinline=1`}
            allow="autoplay"
            className="w-full h-full"
          />
        </div>
      )}

      {isNativeAudio && (
        <audio ref={audioRef} src={src} loop />
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
});

export default AudioPlayer;
