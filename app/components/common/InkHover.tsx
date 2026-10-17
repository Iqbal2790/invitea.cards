import { useEffect } from "react";

function localSpace(el: HTMLElement) {
  const box = el.getBoundingClientRect();
  const w = el.offsetWidth;
  const h = el.offsetHeight;
  const sx = w ? box.width / w : 1;
  const sy = h ? box.height / h : 1;
  return {
    w,
    h,
    toLocal: (p: { x: number; y: number }) => ({
      x: (p.x - box.left) / sx,
      y: (p.y - box.top) / sy,
    }),
  };
}

function plateRadius(el: HTMLElement, w: number, h: number) {
  const rr = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
  return Math.min(rr, w / 2, h / 2);
}

function plateReach(w: number, h: number, rr: number, x: number, y: number) {
  const ix = w - rr;
  const iy = h - rr;
  return (
    rr +
    Math.max(
      Math.hypot(x - rr, y - rr),
      Math.hypot(x - ix, y - rr),
      Math.hypot(x - rr, y - iy),
      Math.hypot(x - ix, y - iy)
    )
  );
}

function inPlate(w: number, h: number, rr: number, x: number, y: number) {
  if (x < 0 || y < 0 || x > w || y > h) return false;
  const cx = Math.min(Math.max(x, rr), w - rr);
  const cy = Math.min(Math.max(y, rr), h - rr);
  const dx = x - cx;
  const dy = y - cy;
  return dx * dx + dy * dy <= rr * rr + 0.01;
}

function crossPoint(
  w: number,
  h: number,
  rr: number,
  from: { x: number; y: number } | null,
  to: { x: number; y: number }
) {
  if (!from) return to;
  let ax = from.x;
  let ay = from.y;
  let bx = to.x;
  let by = to.y;
  const inside = inPlate(w, h, rr, bx, by);
  if (inPlate(w, h, rr, ax, ay) === inside) return to;
  for (let i = 0; i < 20; i++) {
    const mx = (ax + bx) / 2;
    const my = (ay + by) / 2;
    if (inPlate(w, h, rr, mx, my) === inside) {
      bx = mx;
      by = my;
    } else {
      ax = mx;
      ay = my;
    }
  }
  return { x: (ax + bx) / 2, y: (ay + by) / 2 };
}

export function InkHover() {
  useEffect(() => {
    let trail: { x: number; y: number } | null = null;
    let fine = false;

    if (typeof window !== "undefined" && window.matchMedia) {
      fine = window.matchMedia("(pointer: fine)").matches;
    }

    const onPointerMove = (e: PointerEvent) => {
      trail = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true, capture: true });

    function handleEnterOrLeave(e: PointerEvent) {
      const target = (e.target as HTMLElement).closest("[data-ink-btn]") as HTMLElement | null;
      if (!target) return;

      const { w, h, toLocal } = localSpace(target);
      const rr = plateRadius(target, w, h);
      const to = toLocal({ x: e.clientX, y: e.clientY });
      const p = fine && trail ? crossPoint(w, h, rr, toLocal(trail), to) : to;

      target.style.setProperty("--ink-x", `${p.x}px`);
      target.style.setProperty("--ink-y", `${p.y}px`);
      target.style.setProperty("--ink-r", `${Math.ceil(plateReach(w, h, rr, p.x, p.y))}px`);
    }

    document.addEventListener("pointerenter", handleEnterOrLeave, true);
    document.addEventListener("pointerleave", handleEnterOrLeave, true);

    return () => {
      window.removeEventListener("pointermove", onPointerMove, true);
      document.removeEventListener("pointerenter", handleEnterOrLeave, true);
      document.removeEventListener("pointerleave", handleEnterOrLeave, true);
    };
  }, []);

  return null;
}
