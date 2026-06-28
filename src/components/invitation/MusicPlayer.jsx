"use client";

import { useState, useEffect, useRef } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";

export default function MusicPlayer({ youtube_url }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef(null);

  // Extract Video ID
  const getVideoId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(youtube_url);

  useEffect(() => {
    if (!videoId) return;

    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      playerRef.current = new window.YT.Player(`youtube-player-${videoId}`, {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          loop: 1,
          controls: 0,
          showinfo: 0,
          autohide: 1,
          modestbranding: 1,
          playsinline: 1, // Penting untuk mobile (iOS)
          playlist: videoId,
        },
        events: {
          onReady: (event) => {
            setIsReady(true);
            // Browser policy usually blocks unmuted autoplay
            // Try to play anyway, if it fails, it will wait for user interaction
            event.target.playVideo();
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else {
              setIsPlaying(false);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  const togglePlay = () => {
    if (!playerRef.current || !isReady) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  if (!videoId) return null;

  return (
    <>
      {/* Hidden YouTube Iframe */}
      <div className="fixed -bottom-[9999px] -left-[9999px] opacity-0 pointer-events-none">
        <div id={`youtube-player-${videoId}`}></div>
      </div>

      {/* Floating Music Button */}
      <button
        onClick={togglePlay}
        className={`fixed bottom-6 left-6 z-50 p-3 md:p-4 rounded-full shadow-xl shadow-brand/20 backdrop-blur-md transition-all duration-500 flex items-center justify-center 
          ${isPlaying ? 'bg-brand text-white animate-[spin_4s_linear_infinite]' : 'bg-white text-brand hover:bg-brand-light'}`}
        aria-label={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
        ) : (
          <VolumeX className="w-5 h-5 md:w-6 md:h-6" />
        )}
        
        {/* Decorative inner circle */}
        <div className="absolute inset-1 border border-white/30 rounded-full"></div>
        <div className="absolute inset-[30%] bg-white/20 rounded-full"></div>
      </button>
    </>
  );
}
