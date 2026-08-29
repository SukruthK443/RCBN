// Every image inside src/assets/projects/ is picked up automatically, so a new
// project only needs its file dropped in that folder and named below.
const images = import.meta.glob('../assets/projects/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
});

export function projectImage(fileName) {
  if (!fileName) return null;
  return images[`../assets/projects/${fileName}`] ?? null;
}

// Order of the filter chips. A project's `category` must be one of these.
export const categories = [
  'Community Service',
  'Professional Development',
  'International Service',
  'Public Relations',
  'Club Service',
];

// How many cards are shown before "Load more" is pressed.
export const PAGE_SIZE = 12;

/*
  To add a project, copy one block and change the values:

    {
      key: 'unique-id',              // any unique string
      title: 'Project Name',
      category: 'Environment',       // one of `categories` above
      month: 'August 2025',          // shown as a badge on the image
      image: 'file-name.jpg',        // file sitting in src/assets/projects/
      desc: 'One or two lines shown on hover.',
    }

  `image` may be left out — the card falls back to a red gradient with `icon`.
  Newest first is the recommended order; nothing depends on it.
*/
export const projects = [
  {
    key: 'ashoka',
    title: 'Ashoka',
    category: ['Club Service','International Service','Public Relations','Professional Development'],
    month: 'July 2026',
    icon: '🦅',
    image: '',
    desc: '6th Installation of Club Officials and Members of our club.',
  },
  {
    key: 'dogs',
    title: 'Be - Aware of Dogs',
    category: ['Community Service'],
    month: 'August 2026',
    icon: '🐾',
    image: '',
    desc: 'An initiative promoting safe, compassionate coexistence with community dogs.',
  },
];
