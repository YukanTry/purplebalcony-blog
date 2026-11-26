import { DEFAULT_LOCALE, LOCALES, OG_LOCALE, HTML_LANG, localePath } from '@/i18n/config';

export const SITE_URL = 'https://blog.purplebalcony.com';
export const SITE_NAME = 'Purple Balcony';
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const absoluteUrl = (locale, path) => `${SITE_URL}${localePath(locale, path)}`;

// hreflang for every locale plus x-default (Portuguese, the original site).
export const languageAlternates = (path) => ({
  ...Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], absoluteUrl(l, path)])),
  'x-default': absoluteUrl(DEFAULT_LOCALE, path),
});

export const buildMetadata = ({ locale, path, title, description, type = 'website', index = true, follow = true }) => {
  const url = absoluteUrl(locale, path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    robots: index ? undefined : { index: false, follow },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      images: [OG_IMAGE],
    },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE] },
  };
};
