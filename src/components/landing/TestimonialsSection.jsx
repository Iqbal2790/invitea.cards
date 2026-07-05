"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

export default function TestimonialsSection({ testimonials }) {
  return (
    <section className="w-full px-4 py-24 md:py-32 bg-white relative overflow-hidden border-t border-border-subtle">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-light/20 rounded-full blur-3xl -z-10" />
      <div className="container mx-auto max-w-6xl space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif text-text-main font-semibold">Cerita Bahagia Mereka</h2>
          <p className="text-text-muted text-base md:text-lg max-w-xl mx-auto">
            Menjadi bagian dari ribuan momen berkesan adalah sebuah kehormatan bagi kami.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials && testimonials.length > 0 ? (
            testimonials.map((testi) => (
              <motion.div key={testi.id} whileHover={{ y: -5 }} className="rounded-3xl border border-border-subtle bg-bg-base/50 p-8 space-y-6 shadow-sm flex flex-col justify-between">
                <div>
                  <Quote className="text-brand/20 w-12 h-12 mb-6" />
                  <p className="text-text-main leading-relaxed italic">
                    &quot;{testi.pesan}&quot;
                  </p>
                </div>
                <div className="pt-4 border-t border-border-subtle mt-6">
                  <p className="font-serif font-medium text-lg text-text-main">{testi.nama}</p>
                  <div className="flex text-yellow-400 mt-1">
                    {[...Array(testi.rating || 5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-text-muted">
              Belum ada testimoni.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
