import { barreiroShare, completedFigures, fillSpans, fillTemplate, findByAddress, isLargestFunded } from '@/lib/articleFacts';
import { formatEuros, formatMonths, formatPercent } from '@/lib/format';
import { ArticleBodyFrame } from '@/components/articles/ArticleBodyFrame';

const ALMADA_ADDRESS = 'praceta fernandes de sa';
const ACORES_ADDRESS = 'rua dos acores';

const inWords = (t, n) => t.numberWords[n] ?? String(n);

const barreiroText = (t, projects) => {
  const { completed, inBarreiro } = barreiroShare(projects);
  let text = completed && inBarreiro
    ? fillTemplate(t.barreiroCount, { n: inWords(t, inBarreiro), total: inWords(t, completed), streets: t.streets })
    : fillTemplate(t.barreiroPlain, { streets: t.streets });
  if (findByAddress(projects, ACORES_ADDRESS)?.status === 'in_progress') text += t.acoresInProgress;
  return text;
};

const almadaText = (locale, t, projects) => {
  const figures = completedFigures(projects, ALMADA_ADDRESS);
  if (!figures) return t.almadaDefault;
  const template = isLargestFunded(projects, figures) ? t.almadaLargest : t.almadaCompleted;
  return fillTemplate(template, {
    raised: formatEuros(locale, figures.raised),
    roi: formatPercent(locale, figures.roi),
    months: formatMonths(locale, figures.duration),
  });
};

// ", in progress" after each upcoming street, from the project status; empty when unknown.
const withStatus = (t, projects, html) => fillSpans(html, (key) => t.statusSuffix[findByAddress(projects, key)?.status] ?? '');

export const SouthBankBody = ({ locale, t, shared, projects }) => (
  <ArticleBodyFrame locale={locale} shared={shared}>
    <p className="lead">{t.purpleBalconyIsHeadquartered}</p>
    <h2>{t.barreiroWhereItAll}</h2>
    <p id="d-barreiro">{barreiroText(t, projects)}</p>
    <h2>{t.almada}</h2>
    <p id="d-almada">{almadaText(locale, t, projects)}</p>
    <h2>{t.whatComesNext}</h2>
    <ul>
      <li dangerouslySetInnerHTML={{ __html: withStatus(t, projects, t.santoAntonioDaCharneca) }} />
      <li dangerouslySetInnerHTML={{ __html: withStatus(t, projects, t.amoraRuaJoaoGaspar) }} />
      <li dangerouslySetInnerHTML={{ __html: withStatus(t, projects, t.moitaRuaSaoJose) }} />
    </ul>
    <h2>{t.whyRehabilitation}</h2>
    <p>{t.purpleBalconyPromotesProjects}</p>
  </ArticleBodyFrame>
);
