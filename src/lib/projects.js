// Pure project logic shared by server and client components. No aliased imports so `node --test` can load it.
export const toNumber = (value) => (value === null || value === undefined || value === '' || Number.isNaN(Number(value)) ? null : Number(value));

const round1 = (value) => Math.round(value * 10 + 1e-9) / 10;
const average = (list) => (list.length ? list.reduce((a, b) => a + b, 0) / list.length : null);

// Stock photos used by the home page when a project has no hero image (drafts stay without photo).
const FALLBACK_PHOTOS = ['/assets/p1.webp', '/assets/p2.jpeg', '/assets/p4.webp', '/assets/p5.webp'];

// Supabase rows → the plain shape the UI uses. titles: { pt, en, es, fr } from project_translations.
export const normalizeProjects = (rows, translations = [], media = [], storageUrl = (path) => path) => {
  const titles = {};
  translations.forEach((t) => {
    titles[t.project_id] = { ...titles[t.project_id], [t.language_code]: t.title };
  });
  const images = Object.fromEntries(media.map((m) => [m.project_id, storageUrl(m.file_url)]));

  return rows.map((p, i) => {
    const image = images[p.id] ?? null;
    const lat = toNumber(p.latitude);
    const lng = toNumber(p.longitude);
    return {
      id: String(p.id),
      status: p.status,
      address: p.address ?? null,
      city: p.city ?? null,
      countryId: p.country_id ?? null,
      isFeatured: Boolean(p.is_featured),
      position: lat !== null && lng !== null ? [lat, lng] : null,
      roi: toNumber(p.roi_percentage),
      duration: toNumber(p.duration_months),
      minInvestment: toNumber(p.min_investment),
      target: toNumber(p.target_amount),
      raised: toNumber(p.current_raised_amount),
      titles: titles[p.id] ?? {},
      image,
      photo: image ?? (p.status === 'draft' ? null : FALLBACK_PHOTOS[i % FALLBACK_PHOTOS.length]),
    };
  });
};

export const projectName = (p, locale) => p.titles[locale] || (locale === 'pt' ? null : p.titles.en) || p.address || null;

export const projectPlace = (p, locale) => {
  const name = projectName(p, locale);
  const address = p.address && p.address !== name ? p.address : '';
  const city = p.city || '';
  if (!city || (p.address || '').toLowerCase().includes(city.toLowerCase())) return address;
  return address ? `${address}, ${city}` : city;
};

export const fundedPercent = (p) => (p.target > 0 ? Math.min(100, Math.round(((p.raised || 0) / p.target) * 100)) : 0);

// Legacy rule: raised amount, or the target when nothing is recorded as raised.
export const raisedOrTarget = (p) => p.raised || p.target;

// Home and blog cards: first open, first under analysis, featured (or first) draft. null = placeholder.
export const pickCards = (all) => [
  all.find((p) => p.status === 'open') ?? null,
  all.find((p) => p.status === 'analysis') ?? null,
  all.find((p) => p.status === 'draft' && p.isFeatured) ?? all.find((p) => p.status === 'draft') ?? null,
];

// Track record: in progress first, then completed, keeping the database order inside each group.
export const trackRecord = (all) => [
  ...all.filter((p) => p.status === 'in_progress'),
  ...all.filter((p) => p.status === 'completed'),
];

export const trackRecordStats = (all) => {
  const completed = all.filter((p) => p.status === 'completed');
  const funded = all.filter((p) => p.status === 'completed' || p.status === 'in_progress');
  const rois = completed.map((p) => p.roi).filter((v) => v !== null);
  const durations = completed.map((p) => p.duration).filter((v) => v !== null);
  return {
    averageRoi: rois.length ? average(rois) : null,
    averageDuration: durations.length ? Math.round(average(durations)) : null,
    totalFunded: funded.reduce((sum, p) => sum + (p.target || 0), 0),
    fundedCount: funded.length,
    completedCount: completed.length,
    completedWithRoi: rois.length,
  };
};

// Simulator: up to five completed projects with real return and term, plus the track record average.
export const simulatorChoices = (all) => {
  const completed = all.filter((p) => p.status === 'completed');
  const choices = completed.filter((p) => p.roi !== null && p.duration !== null).slice(0, 5)
    .map((p) => ({ id: p.id, name: p.address, titles: p.titles, roi: p.roi, months: p.duration }));
  const { averageRoi, averageDuration, completedWithRoi } = trackRecordStats(all);
  if (averageRoi !== null && averageDuration !== null) {
    choices.push({ id: 'average', isAverage: true, count: completedWithRoi, roi: round1(averageRoi), months: averageDuration });
  }
  return choices;
};

export const IRS_RATE = 0.28;

export const simulate = (amount, roi) => {
  const gross = (amount * roi) / 100;
  const tax = gross * IRS_RATE;
  const net = gross - tax;
  return { gross, tax, net, total: amount + net };
};
