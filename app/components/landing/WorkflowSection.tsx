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
    src: "/thumbnails/wedding-portrait.jpg",
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
  const previewRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Continuous 1:1 scroll tracking, dynamic space transfer, and card stacking
  const handleScroll = useCallback(() => {
    if (!scrollyRef.current || !stickyRef.current) return;

    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
    const scrollyRect = scrollyRef.current.getBoundingClientRect();
    const stickyTop = parseFloat(window.getComputedStyle(stickyRef.current).top) || 64;
    const maxScroll = Math.max(1, scrollyRef.current.offsetHeight - window.innerHeight);

    // Fraction of scroll over which panels stack (85% stack, 15% resting dwell)
    const STACK_END = 0.85;
    const scrolled = Math.min(Math.max(-scrollyRect.top + stickyTop, 0), maxScroll);
    const progress = Math.min(1, scrolled / (maxScroll * STACK_END)) * (STEPS.length - 1);
    const base = Math.floor(progress);
    const frac = progress - base;

    // 1. Continuous panel sliding with hardware-accelerated translate3d
    panelRefs.current.forEach((p, k) => {
      if (!p) return;
      if (!isClickScrollingRef.current) {
        p.style.transition = "none";
      }
      p.style.zIndex = String(k + 10);
      let ty: number;
      if (k <= base) ty = 0;
      else if (k === base + 1) ty = (1 - frac) * 100;
      else ty = 100;
      p.style.transform = `translate3d(0, ${ty}%, 0)`;
    });

    // 2. Active step highlight (switch at 50% midpoint of panel transition)
    const currentIdx = Math.min(STEPS.length - 1, Math.max(0, Math.round(progress)));
    if (!isClickScrollingRef.current && currentIdx !== activeStepRef.current) {
      activeStepRef.current = currentIdx;
      setActiveStep(currentIdx);
    }

    // 3. Dynamic step space transfer (OpenDesign rail mechanics)
    // Keeps upcoming unopened steps pinned to the bottom of the card height, then smoothly
    // transfers the empty space below the next step as it rises with its preview.
    if (isDesktop && previewRef.current && railRef.current) {
      const previewH = previewRef.current.getBoundingClientRect().height;
      const gap = 8; // Row gap between tabs in px
      const totalLabelH = labelRefs.current.reduce(
        (sum, el) => sum + (el ? el.getBoundingClientRect().height : 0),
        0
      );
      const free = Math.max(0, previewH - totalLabelH - gap * (STEPS.length - 1));

      labelRefs.current.forEach((label, k) => {
        if (!label) return;
        if (!isClickScrollingRef.current) {
          label.style.transition = "none";
        }
        const space = k === base ? free * (1 - frac) : k === base + 1 ? free * frac : 0;
        const targetMargin = k < STEPS.length - 1 ? space : 0;
        label.style.marginBottom = `${targetMargin}px`;
      });
    } else {
      // Clean up desktop margins on mobile
      labelRefs.current.forEach((label) => {
        if (label) label.style.marginBottom = "0px";
      });
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

  // Click on a step tab smoothly scrolls to that step's exact scroll slice
  const handleTabClick = (idx: number) => {
    setActiveStep(idx);
    activeStepRef.current = idx;
    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 700);

    // Update panels with smooth transition during click
    panelRefs.current.forEach((p, k) => {
      if (!p) return;
      p.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
      p.style.zIndex = String(k + 10);
      p.style.transform = `translate3d(0, ${k <= idx ? 0 : 100}%, 0)`;
    });

    // Update step space transfer with smooth transition during click
    if (previewRef.current && railRef.current) {
      const previewH = previewRef.current.getBoundingClientRect().height;
      const gap = 8;
      const totalLabelH = labelRefs.current.reduce(
        (sum, el) => sum + (el ? el.getBoundingClientRect().height : 0),
        0
      );
      const free = Math.max(0, previewH - totalLabelH - gap * (STEPS.length - 1));

      labelRefs.current.forEach((label, k) => {
        if (!label) return;
        label.style.transition = "margin-bottom 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
        const space = k === idx ? free : 0;
        const targetMargin = k < STEPS.length - 1 ? space : 0;
        label.style.marginBottom = `${targetMargin}px`;
      });
    }

    if (!scrollyRef.current) return;
    const scrollyRect = scrollyRef.current.getBoundingClientRect();
    const scrollyAbsoluteTop = window.scrollY + scrollyRect.top;
    const stickyTop = stickyRef.current ? parseFloat(window.getComputedStyle(stickyRef.current).top) || 64 : 64;
    const maxScroll = Math.max(1, scrollyRef.current.offsetHeight - window.innerHeight);

    const STACK_END = 0.85;
    const frac = STEPS.length > 1 ? (idx / (STEPS.length - 1)) * STACK_END : 0;
    const targetScroll = scrollyAbsoluteTop - stickyTop + frac * maxScroll + (idx > 0 ? 1 : 0);

    const lenis = (window as unknown as { lenis?: { scrollTo: (y: number, opts?: { duration?: number }) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 0.6 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section
      id="alur"
      ref={scrollyRef}
      className="relative w-full h-[250vh] bg-white dark:bg-black border-t border-black/8 dark:border-white/10"
    >
      {/* Sticky Pin Container: stays locked in view while user scrolls through the 250vh range */}
      <div
        ref={stickyRef}
        className="sticky top-14 sm:top-16 lg:top-20 w-full min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)] flex flex-col justify-center py-6 sm:py-8 lg:py-10 overflow-hidden"
      >
        {/* OpenDesign Exact Width Container (1532px content canvas, 186.5px gutters on 1920px screen) */}
        <div className="w-full max-w-[1580px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="max-w-3xl mb-6 sm:mb-8 lg:mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-tight leading-[1.15]">
              Dari pilih template, sampai undangan siap disebar.
            </h2>
          </div>

          {/* OpenDesign Architecture: Fixed 384px Stepper Tablist Left, Expansive 1fr Preview Right */}
          <div className="grid grid-cols-1 lg:grid-cols-[384px_1fr] gap-6 lg:gap-7 items-stretch">
            {/* Left Column: Interactive Step Selector Tabs with Dynamic Step Space Transfer */}
            <div
              ref={railRef}
              className="w-full lg:w-[384px] flex flex-col justify-between"
            >
              <div className="flex flex-col gap-2">
                {STEPS.map((item, idx) => {
                  const isActive = activeStep === idx;

                  return (
                    <div
                      key={item.id}
                      ref={(el) => {
                        labelRefs.current[idx] = el;
                      }}
                      onClick={() => handleTabClick(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleTabClick(idx);
                        }
                      }}
                      className={`relative rounded-2xl p-4 sm:p-5 transition-colors duration-200 cursor-pointer select-none text-left ${
                        isActive
                          ? "bg-black dark:bg-neutral-900 border border-transparent dark:border-white/15 text-white shadow-md"
                          : "border border-transparent bg-transparent hover:bg-black/[0.03] dark:hover:bg-white/[0.05] text-ink/75 dark:text-white/70 hover:text-ink dark:hover:text-white shadow-none"
                      }`}
                    >
                      <h3
                        className={`text-base font-bold leading-snug tracking-tight transition-colors duration-200 ${
                          isActive
                            ? "text-white"
                            : "text-ink/80 dark:text-white/80 hover:text-ink dark:hover:text-white"
                        }`}
                      >
                        {item.title}
                      </h3>

                      {/* Smooth CSS Grid Expand (Hirael Feature 11 mechanism) */}
                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                          isActive
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0 pointer-events-none"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="pt-2 text-sm text-white/80 dark:text-neutral-300 leading-relaxed font-normal">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action button on step 3 with smooth expand/reveal */}
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  activeStep === 2
                    ? "grid-rows-[1fr] opacity-100 pt-4 lg:pt-0"
                    : "grid-rows-[0fr] opacity-0 pointer-events-none pt-0"
                }`}
              >
                <div className="overflow-hidden">
                  <a
                    href="https://create.invitea.cards"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-black dark:bg-white px-8 py-3.5 text-sm sm:text-base font-medium text-white dark:text-black shadow-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors active:scale-[0.97]"
                  >
                    <span>Mulai buat undangan</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Preview Container (1120px at 1920px, Aspect 16:9 like OpenDesign) */}
            <div className="w-full min-w-0 flex items-center">
              <div
                ref={previewRef}
                className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden aspect-video bg-black/5 dark:bg-white/5 shadow-sm"
              >
                {STEP_IMAGES.map((img, idx) => {
                  return (
                    <div
                      key={img.src}
                      ref={(el) => {
                        panelRefs.current[idx] = el;
                      }}
                      className="absolute inset-0 w-full h-full will-change-transform rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_-4px_24px_rgba(0,0,0,0.12)] bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/15"
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
    </section>
  );
}
