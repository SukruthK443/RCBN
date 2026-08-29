import { useEffect, useRef } from 'react';
import photo from '../assets/president-photo.png';

const REVEAL_RANGE = 280;

export default function President() {
  const layoutRef = useRef(null);
  const photoRef = useRef(null);
  const quoteRef = useRef(null);
  const baselineRef = useRef(0);

  useEffect(() => {
    const layout = layoutRef.current;
    const photoEl = photoRef.current;
    const quoteEl = quoteRef.current;
    if (!layout || !photoEl || !quoteEl) return;

    baselineRef.current = window.scrollY;
    let raf = null;
    let shift = 0;

    function measure() {
      const prevTransform = photoEl.style.transform;
      photoEl.style.transform = 'none';
      const layoutRect = layout.getBoundingClientRect();
      const photoRect = photoEl.getBoundingClientRect();
      const naturalInset = photoRect.left - layoutRect.left;
      shift = Math.max(0, (layoutRect.width - photoRect.width) / 2 - naturalInset);
      photoEl.style.transform = prevTransform;
    }

    function update() {
      raf = null;

      if (window.innerWidth <= 820) {
        photoEl.style.transform = 'none';
        quoteEl.style.opacity = 1;
        quoteEl.style.transform = 'none';
        return;
      }

      const scrolled = window.scrollY - baselineRef.current;
      const progress = Math.min(1, Math.max(0, scrolled / REVEAL_RANGE));

      // sticky holds the heading during the reveal; past it this offset cancels
      // the pin so the heading scrolls up ahead of the photo
      photoEl.style.transform = `translateX(${(1 - progress) * shift - progress * 40}px)`;
      quoteEl.style.opacity = progress;
      quoteEl.style.transform = `translateX(${(1 - progress) * 24}px)`;
      quoteEl.style.pointerEvents = progress > 0.1 ? 'auto' : 'none';
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(update);
    }

    function onResize() {
      measure();
      onScroll();
    }

    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="president" className="president-section">
      <div className="president-stage">
        <h2 className="president-heading">
          <span className="team-white">TEAM</span>
          <span className="team-red">AGNIVA</span>
        </h2>

        <div className="president-layout" ref={layoutRef}>
          <div className="president-photo-wrap" ref={photoRef}>
            <img src={photo} alt="Rtr. Keerthana, President" className="president-photo" />
          </div>

          <div className="president-quote" ref={quoteRef}>
            <span className="quote-mark">&ldquo;</span>
            <p>
              At Agniva, we believe every small act can spark big change. With compassion in our
              hearts, purpose in our actions, and the power of collaboration, we turn ideas into
              impact and kindness into smiles. Together, let&rsquo;s serve, inspire, and most
              importantly —
            </p>
            <p className="quote-highlight">IGNITE THE IMPOSSIBLE</p>
            <p className="quote-author">
              <span className="dash">&mdash;</span> Rtr. Keerthana
              <br />
              <span className="role">PRESIDENT</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
