import '@/styles/pages/article.css';
import { preload } from 'react-dom';
import { notFound } from 'next/navigation';
import { HTML_LANG } from '@/i18n/config';
import { pageMeta } from '@/i18n/meta';
import { articlesMessages } from '@/i18n/messages/articles';
import { commonMessages } from '@/i18n/messages/common';
import { projectsMessages } from '@/i18n/messages/projects';
import { articleContractMessages } from '@/i18n/messages/articleContract';
import { articleStepsMessages } from '@/i18n/messages/articleSteps';
import { articleSouthBankMessages } from '@/i18n/messages/articleSouthBank';
import { ARTICLES, findArticle } from '@/content/articles';
import { buildMetadata, absoluteUrl, SITE_URL } from '@/lib/seo';
import { breadcrumbs, wwwUrl, ORGANIZATION_ID } from '@/lib/organization';
import { getProjects } from '@/server/controllers/projects.controller';
import { JsonLd } from '@/components/seo/JsonLd';
import { FixedCta } from '@/components/layout/FixedCta';
import { ArticleHero } from '@/components/articles/ArticleHero';
import { RelatedArticles } from '@/components/articles/RelatedArticles';
import { ArticleClosing } from '@/components/articles/ArticleClosing';
import { ContractBody } from '@/components/articles/contract/Body';
import { StepsBody } from '@/components/articles/steps/Body';
import { SouthBankBody } from '@/components/articles/south-bank/Body';

const BODIES = {
  contract: { Body: ContractBody, messages: articleContractMessages },
  steps: { Body: StepsBody, messages: articleStepsMessages },
  southBank: { Body: SouthBankBody, messages: articleSouthBankMessages },
};

// FAQPage only with questions that appear verbatim on the page, answered by the paragraph below them.
const FAQ = {
  contract: (t, headline) => [[headline, t.everyInvestmentAtPurple], [t.whatAboutTaxes, t.incomeIsSubjectTo]],
};

const faqSchema = (pairs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: pairs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
});

// Only the known articles exist: any other slug is unmatched and gets src/app/global-not-found.js.
// Their figures come from Supabase, same ISR window as the data.
export const dynamicParams = false;
export const revalidate = 600;
export const generateStaticParams = () => ARTICLES.map((a) => ({ article: a.slug }));

export const generateMetadata = async ({ params }) => {
  const { locale, article: slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};
  const metadata = buildMetadata({ locale, path: `/${slug}`, type: 'article', ...pageMeta[article.metaKey][locale] });
  return {
    ...metadata,
    openGraph: { ...metadata.openGraph, publishedTime: article.published, modifiedTime: article.modified },
  };
};

const ArticlePage = async ({ params }) => {
  const { locale, article: slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const shared = articlesMessages[locale];
  const { Body, messages } = BODIES[article.key];
  const projects = await getProjects();
  const url = absoluteUrl(locale, `/${slug}`);
  const { title, description } = pageMeta[article.metaKey][locale];
  const headline = shared.cards[article.key].title;

  // The cover (a CSS background) is the LCP image: fetch it with the HTML.
  preload(article.image, { as: 'image' });

  const posting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    url,
    mainEntityOfPage: url,
    image: `${SITE_URL}${article.image}`,
    inLanguage: HTML_LANG[locale],
    datePublished: article.published,
    dateModified: article.modified,
    isPartOf: { '@type': 'Blog', '@id': `${SITE_URL}/#blog`, url: absoluteUrl(locale, '/') },
    author: { '@type': 'Organization', '@id': ORGANIZATION_ID, name: 'Purple Balcony', url: wwwUrl('/') },
    publisher: { '@type': 'Organization', '@id': ORGANIZATION_ID, name: 'Purple Balcony', url: wwwUrl('/') },
  };

  return (
    <main id="topo">
      <JsonLd data={posting} />
      {FAQ[article.key] && <JsonLd data={faqSchema(FAQ[article.key](messages[locale], headline))} />}
      <JsonLd data={breadcrumbs([
        { name: commonMessages[locale].home, url: wwwUrl('/') },
        { name: commonMessages[locale].blog, url: absoluteUrl(locale, '/') },
        { name: headline || title, url },
      ])} />
      <ArticleHero shared={shared} article={article} />
      <Body locale={locale} t={messages[locale]} shared={shared} projects={projects} projectsT={projectsMessages[locale]} />
      <RelatedArticles locale={locale} shared={shared} slug={slug} />
      <ArticleClosing shared={shared} />
      <FixedCta label={commonMessages[locale].investNow} />
    </main>
  );
};

export default ArticlePage;
