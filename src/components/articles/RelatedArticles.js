import Link from 'next/link';
import { localePath } from '@/i18n/config';
import { relatedArticles } from '@/content/articles';
import { ArticleCard } from '@/components/articles/ArticleCard';

export const RelatedArticles = ({ locale, shared, slug }) => (
  <section className="sec tema-lilas" aria-labelledby="h-mais">
    <div className="wrap">
      <div className="sec-cabeca">
        <h2 id="h-mais" dangerouslySetInnerHTML={{ __html: shared.keepReading }} />
        <div className="lado">
          <Link className="btn btn-outline" href={localePath(locale, '/')}>{shared.seeAllArticles}</Link>
        </div>
      </div>
      <div className="artigos mais-artigos">
        {relatedArticles(slug).map((a) => <ArticleCard key={a.slug} locale={locale} t={shared} article={a} />)}
      </div>
    </div>
  </section>
);
