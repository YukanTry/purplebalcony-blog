export const Hero = ({ t }) => (
  <section className="hero hero-pagina" aria-labelledby="h-hero">
    <div className="wrap hero-texto">
      <p className="pilula-link pilula-texto">{t.blog}</p>
      <h1 id="h-hero" dangerouslySetInnerHTML={{ __html: t.realEstateInvestmentKnowledge }} />
      <p className="sub">{t.articlesAnalysisAndPerspectives}</p>
      <div className="cta-hero">
        <a className="btn btn-gold" href="#artigos">{t.readTheArticles}</a>
      </div>
    </div>
  </section>
);
