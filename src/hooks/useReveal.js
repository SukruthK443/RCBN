import { useEffect, useRef, useState } from 'react';

/**
 * Adds a `visible` flag the first time the element scrolls into view, so
 * sections can animate in once instead of on every pass.
 */
export default function useReveal({ threshold = 0.2, once = true } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // no IntersectionObserver (or reduced motion) — just show everything
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, visible];
}
