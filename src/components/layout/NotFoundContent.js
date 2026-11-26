import Link from 'next/link';
import { DEFAULT_LOCALE, localePath } from '@/i18n/config';
import { wwwUrl } from '@/lib/organization';

const TEXT = {
  pt: { title: 'Página não encontrada', text: 'O endereço que procura não existe ou mudou de sítio.', home: 'Voltar à página inicial', projects: 'Ver os projetos', blog: 'Ler o blog' },
  en: { title: 'Page not found', text: 'The address you are looking for does not exist or has moved.', home: 'Back to the home page', projects: 'See the projects', blog: 'Read the blog' },
  es: { title: 'Página no encontrada', text: 'La dirección que busca no existe o ha cambiado de lugar.', home: 'Volver a la página de inicio', projects: 'Ver los proyectos', blog: 'Leer el blog' },
  fr: { title: 'Page introuvable', text: 'L’adresse que vous cherchez n’existe pas ou a changé.', home: 'Retour à l’accueil', projects: 'Voir les projets', blog: 'Lire le blog' },
};

export const NotFoundContent = ({ locale = DEFAULT_LOCALE }) => {
  const t = TEXT[locale];
  return (
    <main id="topo">
      <section className="hero hero-pagina" aria-labelledby="h-hero">
        <div className="wrap hero-texto">
          <h1 id="h-hero">{t.title}</h1>
          <p className="sub">{t.text}</p>
          <div className="cta-hero">
            <a className="btn btn-gold" href={wwwUrl('/')}>{t.home}</a>
            <a className="btn btn-outline" href={wwwUrl('/investors')}>{t.projects}</a>
            <Link className="btn btn-outline" href={localePath(locale, '/')}>{t.blog}</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
