import { useState, useEffect, useRef, useCallback } from "react";

interface StepItem {
  id: string;
  title: string;
  description: string;
}

const STEPS: StepItem[] = [
  {
    id: "step-1",
    title: "Pilih template",
    description: "Lihat dulu semua template undangan, lalu pilih yang paling cocok buat acaramu.",
  },
  {
    id: "step-2",
    title: "Isi data",
    description: "Isi data acaramu, seperti nama, tanggal, dan lokasi. Langsung mulai tanpa perlu registrasi.",
  },
  {
    id: "step-3",
    title: "Undangan siap disebar",
    description: "Link undangan tinggal kamu salin dan kirim lewat WhatsApp. Kamu yang pilih mau kirim ke siapa dan kapan.",
  },
];

const STEP_IMAGES = [
  {
    src: "/thumbnails/instant-wedding.jpg",
    alt: "Pilih template undangan pernikahan",
  },
  {
    src: "/images/laptop-mockup.webp",
    alt: "Isi data mempelai dan acara pernikahan",
  },
  {
    src: "/thumbnails/wedding-rings.jpg",
    alt: "Undangan siap disebar ke WhatsApp",
  },
];

export function WorkflowSection() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const activeStepRef = useRef<number>(0);
  const scrollyRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Smooth scroll sync with scroll progress (OpenDesign 1:1 scrollytelling tracking)
  const handleScroll = useCallback(() => {
    if (!scrollyRef.current || !stickyRef.current) return;

    const scrollyRect = scrollyRef.current.getBoundingClientRect();
    const stickyTop = parseFloat(window.getComputedStyle(stickyRef.current).top) || 64;
    const maxScroll = Math.max(1, scrollyRef.current.offsetHeight - window.innerHeight);

    // Distance scrolled inside this sticky section
    const scrolled = Math.min(Math.max(-scrollyRect.top + stickyTop, 0), maxScroll);
    const t = scrolled / maxScroll;

    // Piecewise scrolly curve matching OpenDesign dwell & transition:
    // t <= 0.12        : Step 0 dwell (Panel 1 at 100%, Step 0 tab active)
    // 0.12 < t < 0.48  : Step 0 -> Step 1 transition (Panel 1 rises 100% -> 0%)
    // 0.48 <= t <= 0.52: Step 1 dwell (Panel 1 rested at 0%, Panel 2 at 100%)
    // 0.52 < t < 0.88  : Step 1 -> Step 2 transition (Panel 2 rises 100% -> 0%)
    // t >= 0.88        : Step 2 dwell (Panel 2 rested at 0%, Step 2 tab active)
    let ty1 = 100;
    let ty2 = 100;
    let step = 0;

    if (t <= 0.12) {
      ty1 = 100;
      ty2 = 100;
      step = 0;
    } else if (t < 0.48) {
      const p = (t - 0.12) / (0.48 - 0.12);
      ty1 = (1 - p) * 100;
      ty2 = 100;
      step = p >= 0.5 ? 1 : 0;
    } else if (t <= 0.52) {
      ty1 = 0;
      ty2 = 100;
      step = 1;
    } else if (t < 0.88) {
      const p = (t - 0.52) / (0.88 - 0.52);
      ty1 = 0;
      ty2 = (1 - p) * 100;
      step = p >= 0.5 ? 2 : 1;
    } else {
      ty1 = 0;
      ty2 = 0;
      step = 2;
    }

    // Direct hardware-accelerated transforms (60fps/120fps tracking without React re-render lag)
    if (panelRefs.current[0]) {
      panelRefs.current[0].style.transform = "translate3d(0, 0%, 0)";
    }
    if (panelRefs.current[1]) {
      panelRefs.current[1].style.transform = `translate3d(0, ${ty1}%, 0)`;
    }
    if (panelRefs.current[2]) {
      panelRefs.current[2].style.transform = `translate3d(0, ${ty2}%, 0)`;
    }

    // Update active tab highlight only when step index actually changes
    if (step !== activeStepRef.current) {
      activeStepRef.current = step;
      setActiveStep(step);
    }
  }, []);

  useEffect(() => {
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        handleScroll();
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("lenis-scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Initial positioning
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("lenis-scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [handleScroll]);

  // Click on a step tab smoothly scrolls to that step's exact dwell position
  const handleTabClick = (idx: number) => {
    if (!scrollyRef.current) return;
    const scrollyRect = scrollyRef.current.getBoundingClientRect();
    const scrollyAbsoluteTop = window.scrollY + scrollyRect.top;
    const stickyTop = stickyRef.current ? parseFloat(window.getComputedStyle(stickyRef.current).top) || 64 : 64;
    const maxScroll = Math.max(1, scrollyRef.current.offsetHeight - window.innerHeight);

    // Target t values in the dwell zones of each step
    const targetT = idx === 0 ? 0.05 : idx === 1 ? 0.50 : 0.92;
    const targetScroll = scrollyAbsoluteTop - stickyTop + targetT * maxScroll;

    const lenis = (window as unknown as { lenis?: { scrollTo: (y: number, opts?: { duration?: number }) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 0.7 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section
      id="alur"
      ref={scrollyRef}
      className="relative w-full h-[250vh] bg-[#FAF9F7] border-t border-black/8"
    >
      {/* Sticky Pin Container: stays locked in view while user scrolls through the 250vh range */}
      <div
        ref={stickyRef}
        className="sticky top-14 sm:top-16 lg:top-20 w-full min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)] flex flex-col justify-center py-6 sm:py-8 lg:py-10 overflow-hidden"
      >
        {/* OpenDesign Exact Width Container (1360px max, 64px padding, 1168px content grid) */}
        <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="w-full max-w-[1168px] mx-auto">
            {/* Section Header */}
            <div className="max-w-2xl mb-8 sm:mb-10 lg:mb-12">
              <p className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-berry mb-2">
                Alur 3 Langkah · Mulai Gratis
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-tight leading-[1.15]">
                Dari pilih template, sampai undangan siap disebar.
              </h2>
            </div>

            {/* OpenDesign Architecture: 384px Stepper Tablist Left, 732px Panels Right, 20px Gap */}
            <div className="grid grid-cols-1 lg:grid-cols-[384px_732px] gap-5 lg:gap-6 items-center">
              {/* Left Column: Interactive Step Selector Tabs (384px) - Focused Visitor Attention */}
              <div className="flex flex-col gap-2.5 sm:gap-3">
                {STEPS.map((item, idx) => {
                  const isActive = activeStep === idx;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleTabClick(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleTabClick(idx);
                        }
                      }}
                      className={`relative rounded-2xl transition-all duration-200 cursor-pointer select-none text-left ${
                        isActive
                          ? "bg-[#2D1E1E] text-white p-5 sm:p-6 shadow-md"
                          : "bg-transparent hover:bg-black/[0.03] text-ink/70 hover:text-ink px-4 py-3 sm:py-3.5"
                      }`}
                    >
                      <h3
                        className={`text-base sm:text-lg lg:text-xl font-bold tracking-tight transition-colors duration-200 ${
                          isActive ? "text-white" : "text-ink/75 hover:text-ink font-semibold"
                        }`}
                      >
                        {item.title}
                      </h3>

                      {/* Expanded description on active state only (Clean minimal text) */}
                      {isActive && (
                        <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                          {item.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Visual Preview Container (732px x 412px, Aspect 16:9 like OpenDesign) */}
              <div className="w-full">
                <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden aspect-video bg-black/5 shadow-sm">
                  {STEP_IMAGES.map((img, idx) => {
                    return (
                      <div
                        key={img.src}
                        ref={(el) => {
                          panelRefs.current[idx] = el;
                        }}
                        className="absolute inset-0 w-full h-full will-change-transform rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_-4px_24px_rgba(0,0,0,0.12)] bg-[#FAF9F7]"
                        style={{
                          zIndex: idx + 10,
                          transform: idx === 0 ? "translate3d(0, 0%, 0)" : "translate3d(0, 100%, 0)",
                        }}
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-full object-cover select-none"
                          loading="eager"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
