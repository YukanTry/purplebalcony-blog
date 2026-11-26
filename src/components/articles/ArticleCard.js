import Link from 'next/link';
import { localePath } from '@/i18n/config';

// No hooks: usable from the server (related articles) and from the client blog filter.
export const ArticleCard = ({ locale, t, article, featured = false, hidden = false }) => {
  const { title, summary } = t.cards[article.key];
  return (
    <article className={`artigo-card${featured ? ' destaque' : ''}`} data-cat={article.category} hidden={hidden}>
      <Link href={localePath(locale, `/${article.slug}`)} className="artigo-link">
        <div className="artigo-foto" style={{ backgroundImage: `url(${article.image})` }}>
          <span className="badge b-branco">{t.categories[article.category]}</span>
        </div>
        <div className="artigo-corpo">
          <h3>{title}</h3>
          <p>{summary}</p>
          <span className="artigo-meta" dangerouslySetInnerHTML={{ __html: t.readTime.replace('{n}', article.readMinutes) }} />
        </div>
      </Link>
    </article>
  );
};
