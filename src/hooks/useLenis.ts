import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export const getLenis = () => lenisInstance;

export const scrollToPageTop = (immediate: boolean = true) => {
  const lenis = lenisInstance || (window as any).lenis;
  if (lenis) {
    lenis.stop();
    lenis.scrollTo(0, { immediate, force: true });
    lenis.resize();
    lenis.start();
  }
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

export const useLenis = () => {
  useEffect(() => {
    // Disable browser automatic scroll restoration to prevent landing at footer on route changes
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
    });

    lenisInstance = lenis;
    (window as any).lenis = lenis;

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      lenisInstance = null;
      (window as any).lenis = null;
    };
  }, []);
};
