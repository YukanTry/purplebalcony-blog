// Blog articles: one entry per article page. Texts live in i18n/messages (articles + one file per article).
export const ARTICLES = [
  {
    key: 'contract',
    metaKey: 'articleContract',
    slug: 'artigo-contrato-associacao-participacao',
    category: 'investimento',
    image: '/assets/p5.webp',
    readMinutes: 2,
    published: '2026-10-15',
    modified: '2026-10-16',
  },
  {
    key: 'steps',
    metaKey: 'articleSteps',
    slug: 'artigo-do-imovel-ao-retorno',
    category: 'como-funciona',
    image: '/assets/p1.webp',
    readMinutes: 2,
    published: '2026-10-15',
    modified: '2026-10-16',
  },
  {
    key: 'southBank',
    metaKey: 'articleSouthBank',
    slug: 'artigo-reabilitacao-margem-sul',
    category: 'reabilitacao',
    image: '/assets/p4.webp',
    readMinutes: 2,
    published: '2026-10-15',
    modified: '2026-10-16',
  },
];

export const ARTICLE_CATEGORIES = ['investimento', 'como-funciona', 'reabilitacao'];

export const findArticle = (slug) => ARTICLES.find((a) => a.slug === slug);

export const relatedArticles = (slug) => ARTICLES.filter((a) => a.slug !== slug);
