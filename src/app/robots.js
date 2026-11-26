import { SITE_URL } from '@/lib/seo';

// Everything crawlable; noindex pages say so in their own meta/header, which crawlers must be able to read.
const robots = () => ({
  rules: [{ userAgent: '*', allow: '/' }],
  sitemap: `${SITE_URL}/sitemap.xml`,
  host: SITE_URL,
});

export default robots;
