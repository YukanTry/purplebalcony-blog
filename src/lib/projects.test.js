import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeProjects, pickCards, trackRecord, trackRecordStats, simulatorChoices, simulate, projectName, projectPlace, fundedPercent } from './projects.js';

const rows = [
  { id: 1, status: 'open', address: 'Rua A', city: 'Barreiro', roi_percentage: '12.5', duration_months: 12, min_investment: 1000, target_amount: 100000, current_raised_amount: 25000, latitude: '38.6', longitude: '-9.1' },
  { id: 2, status: 'draft', address: 'Rua B', city: 'Almada', is_featured: true },
  { id: 3, status: 'completed', address: 'Rua C, Barreiro', city: 'Barreiro', roi_percentage: 14, duration_months: 10, target_amount: 50000 },
  { id: 4, status: 'in_progress', address: 'Rua D', city: 'Moita', roi_percentage: 11, duration_months: 14, target_amount: 80000 },
  { id: 5, status: 'completed', address: 'Rua E', roi_percentage: 12, duration_months: 12, target_amount: 30000, current_raised_amount: 30000 },
];
const translations = [{ project_id: 1, language_code: 'en', title: 'Project A' }, { project_id: 1, language_code: 'pt', title: 'Projeto A' }];
const all = normalizeProjects(rows, translations, [{ project_id: 3, file_url: 'c.jpg' }], (p) => `https://cdn/${p}`);

test('normalizes numbers, titles, positions and photos', () => {
  assert.equal(all[0].roi, 12.5);
  assert.deepEqual(all[0].position, [38.6, -9.1]);
  assert.equal(all[1].position, null);
  assert.equal(all[2].image, 'https://cdn/c.jpg');
  assert.equal(all[1].photo, null, 'drafts never get a stock photo');
  assert.ok(all[0].photo.startsWith('/assets/'));
});

test('names fall back to English, then the address; places avoid repeating the city', () => {
  assert.equal(projectName(all[0], 'pt'), 'Projeto A');
  assert.equal(projectName(all[0], 'fr'), 'Project A');
  assert.equal(projectName(all[1], 'es'), 'Rua B');
  assert.equal(projectPlace(all[2], 'pt'), '', 'address already contains the city and equals the name');
  assert.equal(projectPlace(all[0], 'pt'), 'Rua A, Barreiro');
});

test('picks open, analysis placeholder and featured draft', () => {
  const [open, analysis, draft] = pickCards(all);
  assert.equal(open.id, '1');
  assert.equal(analysis, null);
  assert.equal(draft.id, '2');
});

test('track record lists in-progress first and computes stats from completed', () => {
  assert.deepEqual(trackRecord(all).map((p) => p.id), ['4', '3', '5']);
  const stats = trackRecordStats(all);
  assert.equal(stats.averageRoi, 13);
  assert.equal(stats.averageDuration, 11);
  assert.equal(stats.totalFunded, 160000);
  assert.equal(stats.fundedCount, 3);
  assert.equal(stats.completedCount, 2);
});

test('simulator uses completed projects plus the average, and applies 28% IRS', () => {
  const choices = simulatorChoices(all);
  assert.deepEqual(choices.map((c) => c.id), ['3', '5', 'average']);
  assert.equal(choices.at(-1).roi, 13);
  const { gross, tax, net, total } = simulate(1000, 10);
  const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} ≈ ${b}`);
  close(gross, 100);
  close(tax, 28);
  close(net, 72);
  close(total, 1072);
  assert.equal(fundedPercent(all[0]), 25);
});
