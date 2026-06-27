"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Profiles({ data }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
  };

  return (
    <section className="py-20 px-6 relative z-10 overflow-hidden">
      {/* Background Section */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/bg_profiles.png')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center mb-24"
      >
        <h2 className="font-serif text-4xl text-primary">Pasangan Mempelai</h2>
        <p className="font-sans text-sm text-text-muted leading-relaxed mt-4">Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah perkenankanlah kami merangkai kasih sayang yang Kau ciptakan di antara putra-putri kami:</p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-32"
      >
        {/* Pria */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative flex flex-col items-center"
        >
          <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl">
            <Image src={data.mempelai.pria.foto} alt="Groom" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          <div className="w-[90%] bg-white/40 backdrop-blur-md rounded-[24px] p-6 text-center shadow-xl border-[0.5px] border-white/60 -mt-16 relative z-10">
            <h3 className="font-serif text-3xl italic text-text-main mb-2">dr. {data.mempelai.pria.nama_lengkap}</h3>
            <p className="font-sans text-xs text-text-muted leading-relaxed uppercase tracking-widest mb-1">
              Putra dari
            </p>
            <p className="font-sans text-sm font-medium text-text-main">
              Bpk. {data.mempelai.pria.nama_ayah} & Ibu {data.mempelai.pria.nama_ibu}
            </p>
          </div>
        </motion.div>

        <div className="flex justify-center">
          <span className="font-serif text-6xl text-primary opacity-80">&</span>
        </div>

        {/* Wanita */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative flex flex-col items-center"
        >
          <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl">
            <Image src={data.mempelai.wanita.foto} alt="Bride" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          <div className="w-[90%] bg-white/40 backdrop-blur-md rounded-[24px] p-6 text-center shadow-xl border-[0.5px] border-white/60 -mt-16 relative z-10">
            <h3 className="font-serif text-3xl italic text-text-main mb-2">dr. {data.mempelai.wanita.nama_lengkap}</h3>
            <p className="font-sans text-xs text-text-muted leading-relaxed uppercase tracking-widest mb-1">
              Putri dari
            </p>
            <p className="font-sans text-sm font-medium text-text-main">
              Bpk. {data.mempelai.wanita.nama_ayah} & Ibu {data.mempelai.wanita.nama_ibu}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
