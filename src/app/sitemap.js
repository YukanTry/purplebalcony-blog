import { LOCALES } from '@/i18n/config';
import { ARTICLES } from '@/content/articles';
import { absoluteUrl, languageAlternates } from '@/lib/seo';

// Indexable pages only: the blog index and its articles (the 404 is noindex and stays out).
const PAGES = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  ...ARTICLES.map((a) => ({ path: `/${a.slug}`, changeFrequency: 'monthly', priority: 0.8, lastModified: a.modified })),
];

// One <url> per locale, each listing every language version (hreflang) plus x-default.
const sitemap = () => PAGES.flatMap(({ path, ...entry }) => LOCALES.map((locale) => ({
  url: absoluteUrl(locale, path),
  ...entry,
  alternates: { languages: languageAlternates(path) },
})));

export default sitemap;
