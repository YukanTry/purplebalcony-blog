import { completedFigures } from '@/lib/articleFacts';
import { formatEuros, formatMonths, formatPercent } from '@/lib/format';
import { ArticleBodyFrame } from '@/components/articles/ArticleBodyFrame';

const CASE_ADDRESS = 'largo alexandre herculano 21';

const CaseFigures = ({ locale, projectsT, projects }) => {
  const figures = completedFigures(projects, CASE_ADDRESS);
  if (!figures) return <p className="estado-dados">{projectsT.unavailable}</p>;
  return (
    <dl>
      <div><dt>{projectsT.raised}</dt><dd>{formatEuros(locale, figures.raised)}</dd></div>
      <div><dt>{projectsT.term}</dt><dd>{formatMonths(locale, figures.duration)}</dd></div>
      <div><dt>{projectsT.returnDelivered}</dt><dd>{formatPercent(locale, figures.roi)}</dd></div>
    </dl>
  );
};

export const StepsBody = ({ locale, t, shared, projects, projectsT }) => (
  <ArticleBodyFrame locale={locale} shared={shared}>
    <p className="lead">{t.purpleBalconySModel}</p>
    <h2>{t.n1IdentificationAndAnalysis}</h2>
    <p>{t.theTeamIdentifiesProperties}</p>
    <h2>{t.n2InvestmentStructuring}</h2>
    <p>{t.theInvestmentIsStructured}</p>
    <h2>{t.n3CapitalRaising}</h2>
    <p>{t.theProjectOpensTo}</p>
    <h2>{t.n4ExecutionAndMonitoring}</h2>
    <p>{t.purpleBalconyManagesThe}</p>
    <h2>{t.n5ResultsDistribution}</h2>
    <p>{t.onceTheProjectIs}</p>
    <div className="caso">
      <span className="badge b-concluido">{t.completedExample}</span>
      <h3>Largo Alexandre Herculano, 21 · Barreiro</h3>
      <div id="caso-dados">
        <CaseFigures locale={locale} projectsT={projectsT} projects={projects} />
      </div>
      <p>{t.pastReturnsDoNot}</p>
    </div>
  </ArticleBodyFrame>
);
