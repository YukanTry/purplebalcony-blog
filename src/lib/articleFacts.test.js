import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeProjects } from './projects.js';
import { findByAddress, completedTermRange, completedFigures, barreiroShare, isLargestFunded, fillSpans, fillTemplate } from './articleFacts.js';

const all = normalizeProjects([
  { id: 1, status: 'completed', address: 'Largo Alexandre Herculano, 21', city: 'Barreiro', roi_percentage: 13.4, duration_months: 9, target_amount: 60000, current_raised_amount: 60000 },
  { id: 2, status: 'completed', address: 'Praceta Fernandes de Sá, 4', city: 'Almada', roi_percentage: 12, duration_months: 14, target_amount: 250000 },
  { id: 3, status: 'in_progress', address: 'Rua dos Açores, 10', city: 'Barreiro', target_amount: 90000 },
]);

test('finds projects by normalized address words', () => {
  assert.equal(findByAddress(all, 'rua dos acores').id, '3');
  assert.equal(findByAddress(all, 'rua dos acor'), null, 'whole words only');
});

test('term range and figures come from completed projects only', () => {
  assert.deepEqual(completedTermRange(all), { min: 9, max: 14 });
  assert.equal(completedFigures(all, 'largo alexandre herculano 21').raised, 60000);
  assert.equal(completedFigures(all, 'rua dos acores'), null);
  assert.equal(completedTermRange(null), null);
});

test('Barreiro share and largest funded project', () => {
  assert.deepEqual(barreiroShare(all), { completed: 2, inBarreiro: 1 });
  assert.equal(isLargestFunded(all, completedFigures(all, 'praceta fernandes de sa')), true);
});

test('fills placeholder spans with escaped text and templates', () => {
  const html = '<strong>Prazo.</strong><span id="d-prazos"></span> e <span data-estado="rua x"></span>';
  assert.equal(fillSpans(html, (k) => (k === 'd-prazos' ? ' 9 a <14>' : ', em curso')), '<strong>Prazo.</strong><span id="d-prazos"> 9 a &lt;14&gt;</span> e <span data-estado="rua x">, em curso</span>');
  assert.equal(fillTemplate('{a} de {b}', { a: 1, b: 2 }), '1 de 2');
});
