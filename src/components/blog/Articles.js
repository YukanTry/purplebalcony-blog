'use client';

import { useState } from 'react';
import { ARTICLES, ARTICLE_CATEGORIES } from '@/content/articles';
import { ArticleCard } from '@/components/articles/ArticleCard';

const ALL = 'todos';

// Topic chips filter the server-rendered cards in place; every card stays in the HTML for crawlers.
export const Articles = ({ locale, t, cardsT }) => {
  const [filter, setFilter] = useState(ALL);
  const visible = (a) => filter === ALL || a.category === filter;
  const chips = [[ALL, t.all], ...ARTICLE_CATEGORIES.map((c) => [c, cardsT.categories[c]])];

  return (
    <section className="sec" id="artigos" aria-labelledby="h-artigos">
      <div className="wrap">
        <div className="sec-cabeca">
          <h2 id="h-artigos" dangerouslySetInnerHTML={{ __html: t.latestArticles }} />
          <div className="chips" role="group" aria-label={t.filterByTopic}>
            {chips.map(([value, label]) => (
              <button key={value} type="button" className="chip" aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>
            ))}
          </div>
        </div>
        <div className="artigos">
          {ARTICLES.map((a, i) => (
            <ArticleCard key={a.slug} locale={locale} t={cardsT} article={a} featured={i === 0} hidden={!visible(a)} />
          ))}
        </div>
        <p className="artigos-vazio" hidden={ARTICLES.some(visible)}>{t.thereAreNoArticles}</p>
      </div>
    </section>
  );
};
