// Number formats per locale, matching the legacy site: '€1,000' in English, '1 000 €' in Portuguese.
const SEPARATORS = {
  pt: { group: ' ', decimal: ',' },
  en: { group: ',', decimal: '.' },
  es: { group: '.', decimal: ',' },
  fr: { group: ' ', decimal: ',' },
};

const MONTHS = {
  pt: ['mês', 'meses'],
  en: ['month', 'months'],
  es: ['mes', 'meses'],
  fr: ['mois', 'mois'],
};

const groupDigits = (digits, sep) => digits.replace(/\B(?=(\d{3})+(?!\d))/g, sep);

export const formatEuros = (locale, value, decimals = 0) => {
  const { group, decimal } = SEPARATORS[locale];
  const [int, dec] = Math.abs(value).toFixed(decimals).split('.');
  const body = groupDigits(int, group) + (dec ? decimal + dec : '');
  const sign = value < 0 ? '−' : '';
  return locale === 'en' ? `${sign}€${body}` : `${sign}${body} €`;
};

export const formatPercent = (locale, value, fixed = false) => {
  const rounded = Math.round(value * 10 + 1e-9) / 10;
  const text = fixed || !Number.isInteger(rounded) ? rounded.toFixed(1) : String(rounded);
  const localized = locale === 'en' ? text : text.replace('.', SEPARATORS[locale].decimal);
  return locale === 'fr' ? `${localized} %` : `${localized}%`;
};

export const formatMonths = (locale, months) => `${months} ${MONTHS[locale][months === 1 ? 0 : 1]}`;

// Legacy modal format: '€1.25M' for millions, otherwise pt-PT grouping with a leading euro sign.
export const formatCompactEuros = (value) => {
  if (value === null || value === undefined) return '';
  if (value >= 1e6) return `€${(value / 1e6).toFixed(2)}M`;
  return `€${value.toLocaleString('pt-PT', { maximumFractionDigits: 0 })}`;
};
