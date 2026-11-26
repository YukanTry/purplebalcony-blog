import { APP_URL, wwwUrl } from '@/lib/organization';

export const ArticleClosing = ({ shared }) => (
  <section className="sec" aria-labelledby="h-fecho">
    <div className="wrap">
      <div className="fecho-caixa" id="fim">
        <h2 id="h-fecho" dangerouslySetInnerHTML={{ __html: shared.closingTitle }} />
        <div>
          <p>{shared.closingText}</p>
          <div className="acoes">
            <a className="btn btn-gold" href={`${APP_URL}/registar`}>{shared.closingButton}</a>
            {' '}
            <a className="btn btn-outline" href={wwwUrl('/investors')}>{shared.viewOpportunities}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
