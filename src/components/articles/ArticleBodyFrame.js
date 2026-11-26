import Link from 'next/link';
import { localePath } from '@/i18n/config';

// Shared frame of every article body: back link, the article text, and the legal note.
export const ArticleBodyFrame = ({ locale, shared, children }) => (
  <section className="sec" aria-label={shared.articleAria}>
    <div className="wrap">
      <div className="texto">
        <Link className="voltar" href={localePath(locale, '/')}>{shared.backToBlog}</Link>
        {children}
      </div>
      <p className="artigo-aviso">{shared.disclaimer}</p>
    </div>
  </section>
);
