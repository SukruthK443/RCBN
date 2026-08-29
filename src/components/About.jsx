import { useEffect, useState } from 'react';
import useReveal from '../hooks/useReveal';

const pillars = [
  {
    icon: '🤝',
    title: 'Community Service',
    desc: 'Environmental conservation initiatives and support for underprivileged populations.',
  },
  {
    icon: '🚀',
    title: 'Professional Development',
    desc: 'Workshops, seminars, and mentorship opportunities to build skills.',
  },
  {
    icon: '🌍',
    title: 'International Understanding',
    desc: 'Cultural exchange through global Rotaract partnerships.',
  },
  {
    icon: '✨',
    title: 'Social Events',
    desc: 'Fun, community-bonding activities that bring members together.',
  },
];

// edit these freely — `value` drives the count-up, `suffix` is appended
const stats = [
  { value: 25, suffix: '+', label: 'Active Members' },
  { value: 40, suffix: '+', label: 'Projects Delivered' },
  { value: 1200, suffix: '+', label: 'Lives Touched' },
  { value: 8, suffix: '', label: 'Partner Clubs' },
];

function Counter({ value, suffix, run }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(value);
      return;
    }

    const duration = 1400;
    const start = performance.now();
    let raf = null;

    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setN(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => raf && cancelAnimationFrame(raf);
  }, [run, value]);

  return (
    <span className="stat-value">
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function About() {
  const [introRef, introSeen] = useReveal();
  const [statsRef, statsSeen] = useReveal({ threshold: 0.35 });
  const [pillarsRef, pillarsSeen] = useReveal({ threshold: 0.15 });

  return (
    <section id="about" className="about-section hold-section">
      <div className="hold-stage">
      <h2 className="about-heading">
        <span className="about-heading-white">ABOUT</span>
        <span className="about-heading-red">US</span>
      </h2>

      <div ref={introRef} className={`about-intro ${introSeen ? 'is-visible' : ''}`}>
        <p className="about-lead">
          A youth-led organization revitalizing our community and fostering a culture of
          innovation — empowering young individuals to take action on pressing social issues,
          develop leadership skills, and build lasting friendships.
        </p>
        <p className="about-lead about-lead-soft">
          We are a dynamic group of young leaders from diverse backgrounds, united by a shared
          commitment to service and fellowship. We invite anyone passionate about making a
          positive impact to join us.
        </p>
      </div>

      <div ref={statsRef} className={`about-stats ${statsSeen ? 'is-visible' : ''}`}>
        {stats.map((s, i) => (
          <div className="stat" key={s.label} style={{ '--i': i }}>
            <Counter value={s.value} suffix={s.suffix} run={statsSeen} />
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div ref={pillarsRef} className={`activities-grid ${pillarsSeen ? 'is-visible' : ''}`}>
        {pillars.map((a, i) => (
          <article className="activity-card" key={a.title} style={{ '--i': i }}>
            <span className="activity-icon" aria-hidden="true">
              {a.icon}
            </span>
            <h3>{a.title}</h3>
            <p>{a.desc}</p>
          </article>
        ))}
      </div>

      </div>
    </section>
  );
}
