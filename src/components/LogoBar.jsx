import { useEffect, useRef, useState } from 'react';
import logo1 from '../assets/logo1.png';
import logo2 from '../assets/logo2.png';
import logo3 from '../assets/logo3.png';

const logos = [
  { src: logo1, alt: 'Rotaract Club of Bengaluru Nagasandra' },
  { src: logo2, alt: 'Rotaract Club of Bengaluru Nagasandra Crest' },
  { src: logo3, alt: 'Team Agniva' },
];

export default function LogoBar() {
  const sentinelRef = useRef(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPinned(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="logo-bar">
        {logos.map((l) => (
          <img key={l.alt} src={l.src} alt={l.alt} className="logo-item" />
        ))}
      </div>
      <div ref={sentinelRef} className="logo-sentinel" />

      <div className={`logo-bar-pinned ${pinned ? 'visible' : ''}`}>
        <img src={logo1} alt={logos[0].alt} className="logo-item" />
      </div>
    </>
  );
}
