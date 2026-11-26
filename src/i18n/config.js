export const LOCALES = ['pt', 'en', 'es', 'fr'];
export const DEFAULT_LOCALE = 'pt';

export const HTML_LANG = { pt: 'pt-PT', en: 'en', es: 'es', fr: 'fr' };
export const OG_LOCALE = { pt: 'pt_PT', en: 'en_GB', es: 'es_ES', fr: 'fr_FR' };
export const LOCALE_NAMES = { pt: 'Português', en: 'English', es: 'Español', fr: 'Français' };

export const isLocale = (value) => LOCALES.includes(value);

export const localeParams = () => LOCALES.map((locale) => ({ locale }));

// localePath('en', '/investors#historico') → '/en/investors#historico'; Portuguese has no prefix.
export const localePath = (locale, path = '/') => {
  const [pathname, hash] = path.split('#');
  const base = pathname === '/' ? '' : pathname;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  const url = `${prefix}${base}` || '/';
  return hash ? `${url}#${hash}` : url;
};
