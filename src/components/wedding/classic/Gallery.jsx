"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Gallery({ data }) {
  return (
    <section className="py-20 px-6 relative z-10 overflow-hidden">
      {/* Background Section */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/bg_profiles.png')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center space-y-4 mb-12"
      >
        <h2 className="font-serif text-4xl text-primary">Galeri Cinta</h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {data.galeri.map((imgUrl, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`relative rounded-2xl overflow-hidden shadow-lg ${idx === 0 || idx === 3 ? "col-span-2 aspect-[4/3]" : "aspect-[3/4]"}`}
          >
            <Image src={imgUrl} alt="Gallery image" fill className="object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
