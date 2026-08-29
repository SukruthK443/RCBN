import { useMemo, useState } from 'react';
import { projects, projectImage, categories, PAGE_SIZE } from '../data/projects';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [shown, setShown] = useState(PAGE_SIZE);

  // only offer chips for categories that actually have projects
  const chips = useMemo(
    () => ['All', ...categories.filter((c) => projects.some((p) => p.category === c))],
    [],
  );

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const byChip = filter === 'All' || p.category === filter;
      const byText =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.desc || '').toLowerCase().includes(q) ||
        (p.month || '').toLowerCase().includes(q);
      return byChip && byText;
    });
  }, [filter, query]);

  const visible = matches.slice(0, shown);
  const remaining = matches.length - visible.length;

  function pick(next) {
    setFilter(next);
    setShown(PAGE_SIZE); // reset paging whenever the result set changes
  }

  return (
    <section id="projects" className="hold-section">
      <div className="hold-stage">
      <h2 className="projects-heading">Projects</h2>

      <div className="projects-controls">
        <div className="project-chips" role="tablist" aria-label="Filter projects by category">
          {chips.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={filter === c}
              className={`project-chip ${filter === c ? 'active' : ''}`}
              onClick={() => pick(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <input
          type="search"
          className="project-search"
          placeholder="Search projects…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShown(PAGE_SIZE);
          }}
          aria-label="Search projects"
        />
      </div>

      {visible.length === 0 ? (
        <p className="projects-empty">No projects match that search.</p>
      ) : (
        <div className="projects-grid">
          {visible.map((p) => {
            const src = projectImage(p.image);
            return (
              <article className="project-card" key={p.key} tabIndex={0}>
                <div className="project-media">
                  {src ? (
                    <img src={src} alt={p.title} loading="lazy" decoding="async" />
                  ) : (
                    <span className="project-fallback">{p.icon}</span>
                  )}
                  {p.month && <span className="project-month">{p.month}</span>}
                </div>

                <div className="project-body">
                  <h3>{p.title}</h3>
                  {/* inner span is what the collapsed grid row clips */}
                  <p className="project-desc">
                    <span>{p.desc}</span>
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}

        {remaining > 0 && (
          <button
            type="button"
            className="projects-more"
            onClick={() => setShown((n) => n + PAGE_SIZE)}
          >
            Load more ({remaining})
          </button>
        )}
      </div>
    </section>
  );
}
