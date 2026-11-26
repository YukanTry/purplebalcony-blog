export const ArticleHero = ({ shared, article }) => (
  <>
    <section className="hero hero-pagina hero-artigo" aria-labelledby="h-hero">
      <div className="wrap hero-texto">
        <p className="pilula-link pilula-texto">{shared.categories[article.category]}</p>
        <h1 id="h-hero">{shared.cards[article.key].title}</h1>
        <p className="meta-artigo" dangerouslySetInnerHTML={{ __html: shared.byline.replace('{n}', article.readMinutes) }} />
      </div>
    </section>
    <div className="wrap">
      <div className="artigo-capa" style={{ backgroundImage: `url(${article.image})` }} role="img" aria-label={shared.coverAria}></div>
    </div>
  </>
);
