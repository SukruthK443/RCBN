import useReveal from '../hooks/useReveal';

const socials = [
  {
    label: 'Instagram',
    icon: 'fa-brands fa-instagram',
    href: 'https://www.instagram.com/3192_rcbn/',
  },
  {
    label: 'Facebook',
    icon: 'fa-brands fa-facebook-f',
    href: 'https://www.facebook.com/people/Rotaract-Bengaluru-Nagasandra/pfbid0xH9JgHXQJsEKhz1zfzKdBJciAR5e7v4Pym8H9Wy1bzfuqFzAZg5y4uRCTVHmpgzSl/',
  },
];

export default function Contact() {
  const [ref, seen] = useReveal({ threshold: 0.25 });

  return (
    <section id="contact" className="contact-section">
      <div ref={ref} className={`contact-inner ${seen ? 'is-visible' : ''}`}>
        <h2 className="contact-heading">
          <span className="contact-heading-white">GET IN</span>
          <span className="contact-heading-red">TOUCH</span>
        </h2>

        <p className="contact-tagline">
          Got an idea, a cause, or just curiosity? We would love to hear from you.
        </p>

        <div className="contact-cards">
          <a className="contact-card" href="tel:+919606334883">
            <span className="contact-card-icon" aria-hidden="true">
              <i className="fa-solid fa-phone"></i>
            </span>
            <span className="contact-card-label">Call us</span>
            <span className="contact-card-value">+91 96063 34883</span>
          </a>

          <a className="contact-card" href="mailto:rcbn.club@gmail.com">
            <span className="contact-card-icon" aria-hidden="true">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <span className="contact-card-label">Email us</span>
            <span className="contact-card-value">rcbn.club@gmail.com</span>
          </a>
        </div>

        <p className="contact-follow">Follow the journey</p>
        <div className="social-links">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
            >
              <i className={s.icon}></i>
            </a>
          ))}
        </div>

        <a
          className="contact-cta"
          href="https://docs.google.com/forms/d/e/1FAIpQLSfOATC7pPVybUbVE21k3KPsr3HM2P43HXtfzlmwToCXbAzrig/viewform"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join Team Agniva
        </a>
      </div>
    </section>
  );
}
