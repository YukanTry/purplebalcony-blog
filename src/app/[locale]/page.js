import '@/styles/pages/blog.css';
import { blogMessages } from '@/i18n/messages/blog';
import { articlesMessages } from '@/i18n/messages/articles';
import { projectsMessages } from '@/i18n/messages/projects';
import { commonMessages } from '@/i18n/messages/common';
import { pageMeta } from '@/i18n/meta';
import { HTML_LANG } from '@/i18n/config';
import { ARTICLES } from '@/content/articles';
import { buildMetadata, absoluteUrl, SITE_URL } from '@/lib/seo';
import { breadcrumbs, wwwUrl, ORGANIZATION_ID } from '@/lib/organization';
import { getProjects } from '@/server/controllers/projects.controller';
import { JsonLd } from '@/components/seo/JsonLd';
import { FixedCta } from '@/components/layout/FixedCta';
import { ProjectModalProvider } from '@/components/projects/ProjectModal';
import { Hero } from '@/components/blog/Hero';
import { Articles } from '@/components/blog/Articles';
import { OpenProject } from '@/components/blog/OpenProject';

// The blog index is the subdomain's home.
const PATH = '/';

// ISR: same window as the Supabase fetches (PROJECTS_REVALIDATE_SECONDS). Must be a literal.
export const revalidate = 600;

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  return buildMetadata({ locale, path: PATH, ...pageMeta.blog[locale] });
};

const BlogPage = async ({ params }) => {
  const { locale } = await params;
  const t = blogMessages[locale];
  const cardsT = articlesMessages[locale];
  const projectsT = projectsMessages[locale];
  const projects = await getProjects();
  const url = absoluteUrl(locale, PATH);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/#blog`,
    url,
    name: pageMeta.blog[locale].title,
    inLanguage: HTML_LANG[locale],
    publisher: { '@id': ORGANIZATION_ID },
    blogPost: ARTICLES.map((a) => ({
      '@type': 'BlogPosting',
      headline: cardsT.cards[a.key].title,
      url: absoluteUrl(locale, `/${a.slug}`),
      datePublished: a.published,
      dateModified: a.modified,
    })),
  };

  return (
    <ProjectModalProvider locale={locale} t={projectsT}>
      <main id="topo">
        <JsonLd data={blogSchema} />
        <JsonLd data={breadcrumbs([
          { name: commonMessages[locale].home, url: wwwUrl('/') },
          { name: commonMessages[locale].blog, url },
        ])} />
        <Hero t={t} />
        <Articles locale={locale} t={t} cardsT={cardsT} />
        <OpenProject locale={locale} t={t} projectsT={projectsT} projects={projects} />
        <FixedCta label={commonMessages[locale].investNow} />
      </main>
    </ProjectModalProvider>
  );
};

export default BlogPage;
