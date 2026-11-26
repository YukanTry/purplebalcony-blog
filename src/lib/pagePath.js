// '/en/who-we-are' → '/who-we-are'. Also strips the internal '/pt' prefix in case a rewrite exposes it.
// usePathname() can be null while a 404 renders, hence the ?? (a default parameter only covers undefined).
export const pagePath = (pathname) => (pathname ?? '/').replace(/^\/(pt|en|es|fr)(?=\/|$)/, '') || '/';
