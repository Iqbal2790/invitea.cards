"use client";

import { motion } from "framer-motion";

export default function TestimonialsSection({ testimonials }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="py-[clamp(64px,9vw,120px)] w-full">
      <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)]">
        
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={item}
          className="max-w-[640px] mx-auto text-center mb-[clamp(40px,6vw,68px)]"
        >
          <h2 className="font-serif font-medium text-[clamp(2rem,4vw,2.9rem)] leading-[1.08] text-ink">
            Cerita Bahagia Mereka
          </h2>
          <p className="mt-[16px] text-ink-soft text-[16px]">
            Menjadi bagian dari ribuan momen berkesan adalah sebuah kehormatan bagi kami.
          </p>
        </motion.div>

        {testimonials && testimonials.length > 0 ? (
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={container}
            className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(20px,3vw,32px)]"
          >
            {testimonials.map((testi) => (
              <motion.div key={testi.id} variants={item} className="bg-bg-alt p-[32px] rounded-[6px]">
                <div className="font-serif italic text-[3rem] text-pink-soft leading-[1] mb-[6px]">&ldquo;</div>
                <p className="font-serif italic text-[1.2rem] text-ink-soft mb-[24px]">
                  {testi.pesan}
                </p>
                <div className="font-sans text-[14px] text-ink font-semibold uppercase tracking-[0.04em]">
                  {testi.nama}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={item}
            className="text-center max-w-[560px] mx-auto py-[clamp(40px,6vw,64px)]"
          >
            <div className="font-serif italic text-[5rem] text-pink-soft leading-[1] mb-[6px]">&ldquo;</div>
            <p className="font-serif italic text-[1.6rem] text-ink-soft max-w-[30ch] mx-auto">
              Kisah bahagia pertama akan segera hadir di sini.
            </p>
            <div className="font-sans not-italic text-[14.5px] text-ink-soft opacity-75 mt-[14px]">
              Jadilah yang pertama membagikan momenmu bersama Invitea.
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
