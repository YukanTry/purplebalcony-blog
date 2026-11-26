export const CONTACT = {
  phone: '+351917775638',
  phoneLabel: '+351 917 775 638',
  email: 'info@purplebalcony.com',
  linkedin: 'https://www.linkedin.com/company/purplebalcony',
  instagram: 'https://www.instagram.com/purple_balcony/',
  complaintsBook: 'https://www.livroreclamacoes.pt',
};

export const APP_URL = 'https://app.purplebalcony.com';

// The main site. It is PT-only (language switches with JS), so every link goes to its Portuguese URLs.
export const WWW_URL = 'https://www.purplebalcony.com';
export const wwwUrl = (path = '/') => `${WWW_URL}${path}`;
export const ORGANIZATION_ID = `${WWW_URL}/#organization`;

export const breadcrumbs = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(({ name, url }, i) => ({ '@type': 'ListItem', position: i + 1, name, item: url })),
});
