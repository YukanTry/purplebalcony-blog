// Facts the articles quote from live project data. Pure functions over normalized projects (lib/projects).
import { raisedOrTarget } from './projects.js';
import { escapeHtml } from './html.js';

export const normalizeText = (value) => String(value || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

// key is already normalized, e.g. 'largo alexandre herculano 21'.
export const findByAddress = (all, key) => all?.find((p) => ` ${normalizeText(p.address)} `.includes(` ${key} `)) ?? null;

export const fillTemplate = (template, values) => template.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? ''));

const completed = (all) => (all ?? []).filter((p) => p.status === 'completed');

export const completedTermRange = (all) => {
  const terms = completed(all).map((p) => p.duration).filter((v) => v !== null);
  return terms.length ? { min: Math.min(...terms), max: Math.max(...terms) } : null;
};

// Completed project with every figure the article shows, or null.
export const completedFigures = (all, addressKey) => {
  const p = findByAddress(all, addressKey);
  const raised = p ? raisedOrTarget(p) : null;
  if (!p || p.status !== 'completed' || raised == null || p.duration === null || p.roi === null) return null;
  return { project: p, raised, duration: p.duration, roi: p.roi };
};

export const barreiroShare = (all) => {
  const done = completed(all);
  const inBarreiro = done.filter((p) => normalizeText([p.city, p.titles?.pt, p.address].join(' ')).includes('barreiro'));
  return { completed: done.length, inBarreiro: inBarreiro.length };
};

export const isLargestFunded = (all, figures) => (all ?? [])
  .filter((p) => p.status === 'completed' || p.status === 'in_progress')
  .every((p) => (raisedOrTarget(p) || 0) <= figures.raised);


// Fills an empty placeholder span inside translated rich text: <span id="x"></span> or <span data-estado="key"></span>.
export const fillSpans = (html, resolve) => html.replace(/<span ((?:id|data-estado)="([^"]+)")><\/span>/g, (_, attrs, key) => `<span ${attrs}>${escapeHtml(resolve(key))}</span>`);
