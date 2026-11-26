import { wwwUrl } from '@/lib/organization';
import { OpportunityCard } from '@/components/projects/OpportunityCard';

const FALLBACK_PHOTO = '/assets/p1.webp';

// projects: normalized list, or null when Supabase was unavailable at render time.
export const OpenProject = ({ locale, t, projectsT, projects }) => {
  const open = projects?.find((p) => p.status === 'open');
  return (
    <section className="sec tema-escuro" id="fim" aria-labelledby="h-aberto">
      <div className="wrap blog-aberto">
        <div>
          <span className="badge b-branco">{t.openProject}</span>
          <h2 id="h-aberto" dangerouslySetInnerHTML={{ __html: t.whileYouReadInvest }} />
          <p>{t.thisIsTheProject}</p>
          <a className="btn btn-outline" href={wwwUrl('/investors')}>{t.viewAllOpportunities}</a>
        </div>
        <div className="grelha-proj grelha-1" id="proj-aberto">
          {open
            ? <OpportunityCard locale={locale} t={projectsT} project={open} photo={open.image ?? FALLBACK_PHOTO} emptyValueWhenNoTarget />
            : <p className="estado-dados">{projects ? projectsT.noOpenProject : projectsT.unavailable}</p>}
        </div>
      </div>
    </section>
  );
};
