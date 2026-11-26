'use client';

import { APP_URL } from '@/lib/organization';
import { formatEuros, formatMonths, formatPercent } from '@/lib/format';
import { fundedPercent, projectName, projectPlace } from '@/lib/projects';
import { useProjectModal } from '@/components/projects/ProjectModal';

const REGISTER_URL = `${APP_URL}/registar`;
const BADGE_CLASS = { open: 'b-aberto', analysis: 'b-analise' };
const WHITE = { background: '#fff' };

const Figures = ({ locale, t, project }) => {
  const pending = <dd className="txt">{t.pending}</dd>;
  return (
    <dl>
      <div><dt>{t.expected}</dt>{project?.roi != null ? <dd className="destaque">{formatPercent(locale, project.roi)}</dd> : pending}</div>
      <div><dt>{t.term}</dt>{project?.duration != null ? <dd>{formatMonths(locale, project.duration)}</dd> : pending}</div>
      <div><dt>{t.minimum}</dt>{project?.minInvestment != null ? <dd>{formatEuros(locale, project.minInvestment)}</dd> : pending}</div>
    </dl>
  );
};

const InPreparation = ({ t }) => <span className="valor txt">{t.inPreparation}<small>{t.figuresUnderAnalysis}</small></span>;
const NotifyMe = ({ t }) => <a className="btn btn-outline btn-sm" href={REGISTER_URL}>{t.notifyMe}</a>;

const Placeholder = ({ locale, t }) => (
  <article className="proj">
    <div className="proj-foto vazia">{t.photosWhenOpens}<span className="badge b-prep" style={WHITE}>{t.inPreparation}</span></div>
    <div className="proj-corpo">
      <h3>{t.projectInPreparation}</h3>
      <Figures locale={locale} t={t} />
      <div className="proj-acao"><InPreparation t={t} /><NotifyMe t={t} /></div>
    </div>
  </article>
);

const ProgressBar = ({ label, percent, target }) => (
  <div className="barra">
    <div className="barra-topo"><span>{label}</span>{target}</div>
    <div className="barra-fundo"><span style={{ '--p': `${percent}%` }}></span></div>
  </div>
);

// project null → "in preparation" placeholder. emptyValueWhenNoTarget mirrors the blog card.
export const OpportunityCard = ({ locale, t, project, photo, emptyValueWhenNoTarget = false }) => {
  const { openProject } = useProjectModal();
  if (!project) return <Placeholder locale={locale} t={t} />;

  const { status, target } = project;
  const name = projectName(project, locale) || t.project;
  const place = projectPlace(project, locale);
  const badgeClass = BADGE_CLASS[status] ?? 'b-prep';
  const badge = <span className={`badge ${badgeClass}`} style={badgeClass === 'b-prep' ? WHITE : undefined}>{t.status[status] ?? t.status.draft}</span>;
  const targetLabel = target !== null ? <span>{t.target} <b>{formatEuros(locale, target)}</b></span> : null;
  const percent = fundedPercent(project);
  const value = target !== null
    ? <span className="valor">{formatEuros(locale, target)}<small>{t.target}</small></span>
    : emptyValueWhenNoTarget ? <span></span> : <InPreparation t={t} />;

  const open = (e) => {
    if (e.target.closest('a, button')) return;
    openProject(project);
  };
  const onKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) {
      e.preventDefault();
      openProject(project);
    }
  };

  return (
    <article className="proj" data-idx={project.id} tabIndex={0} onClick={open} onKeyDown={onKeyDown}>
      {photo
        ? <div className="proj-foto" style={{ backgroundImage: `url("${photo}")` }}>{badge}</div>
        : <div className="proj-foto vazia">{t.photosWhenOpens}{badge}</div>}
      <div className="proj-corpo">
        <h3>{name}</h3>
        {place && <p className="onde">{place}</p>}
        <Figures locale={locale} t={t} project={project} />
        {status === 'open' && <ProgressBar label={<>{t.funded} <b>{percent}%</b></>} percent={percent} target={targetLabel} />}
        {status === 'analysis' && <ProgressBar label={t.opensAfterAnalysis} percent={0} target={targetLabel} />}
        <div className="proj-acao">
          {value}
          {status === 'open' ? <a className="btn btn-gold btn-sm" href={REGISTER_URL}>{t.investNow}</a> : <NotifyMe t={t} />}
        </div>
      </div>
    </article>
  );
};
