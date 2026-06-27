"use client";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import { DUMMY_WEDDING_DATA } from "@/lib/dummy-data";
import WaxSealInteraction from "@/components/wedding/classic/WaxSealInteraction";
import Cover from "@/components/wedding/classic/Cover";
import Quote from "@/components/wedding/classic/Quote";
import Profiles from "@/components/wedding/classic/Profiles";
import Events from "@/components/wedding/classic/Events";
import Gallery from "@/components/wedding/classic/Gallery";
import RSVP from "@/components/wedding/classic/RSVP";
import Footer from "@/components/wedding/classic/Footer";
import AudioPlayer from "@/components/wedding/classic/AudioPlayer";

export default function WeddingClassicTemplate() {
  const data = DUMMY_WEDDING_DATA;
  const [isUnsealed, setIsUnsealed] = useState(false);
  const audioRef = useRef(null);

  // Kunci scroll saat belum di-unseal
  useEffect(() => {
    if (!isUnsealed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isUnsealed]);

  const handleUnseal = () => {
    setIsUnsealed(true);
    // Call play synchronously within the user interaction event handler
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>
      <main className="bg-[#E5E5E5] min-h-screen">
        <div className="w-full max-w-md mx-auto min-h-screen shadow-2xl relative overflow-x-hidden bg-[#fafafa]">
          
          <AudioPlayer ref={audioRef} src={data.musik_url} isPlaying={isUnsealed} />

          {/* Overlay Amplop */}
          <AnimatePresence>
            {!isUnsealed && (
              <motion.section 
                key="slide-seal"
                className="absolute top-0 inset-x-0 h-[100dvh] z-50 flex flex-col items-center justify-center bg-[#E5E5E5]"
                exit={{ opacity: 0, scale: 1.1, filter: "blur(5px)", transition: { duration: 1 } }}
              >
                {/* Envelope Flap background */}
                <div className="absolute inset-x-0 top-0 h-[50dvh] bg-[#fafafa] rounded-b-[50%] shadow-lg border-b border-gray-200" />
                <div className="relative z-10 w-full flex justify-center">
                  <WaxSealInteraction onBreak={handleUnseal} isBroken={isUnsealed} />
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Konten Utama */}
          <Cover data={data} onOpen={() => {}} hideButton />
          
          <div className="relative z-10">
            <Quote data={data} />
            <Profiles data={data} />
            <Events data={data} />
            <Gallery data={data} />
            <RSVP />
            <Footer />
          </div>

        </div>
      </main>
    </>
  );
}
