import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    const unbind = lenis.on("scroll", () => {
      window.dispatchEvent(new Event("lenis-scroll"));
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    function handleAnchorClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;

      // Handle both pure hash (#faq) and pathname hash (/#faq) when on current page
      let hash = "";
      if (href.startsWith("#") && href.length > 1) {
        hash = href;
      } else if (href.startsWith("/#") && href.length > 2) {
        if (window.location.pathname === "/" || window.location.pathname === "") {
          hash = href.slice(1);
        }
      }

      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          e.preventDefault();
          history.pushState(null, "", hash);
          lenis.scrollTo(el as HTMLElement, { offset: -70 });
        }
      }
    }

    // Handle hash on initial load if present (e.g. navigation from another page)
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) {
          lenis.scrollTo(el as HTMLElement, { offset: -70 });
        }
      }, 150);
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      unbind();
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return null;
}
