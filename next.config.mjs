const SUPABASE_HOST = 'xabqystmncbfxfvoqcpm.supabase.co';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The only root layout is under [locale]: unmatched URLs get src/app/global-not-found.js.
  experimental: { globalNotFound: true },

  images: {
    remotePatterns: [{ protocol: 'https', hostname: SUPABASE_HOST, pathname: '/storage/v1/object/public/**' }],
  },

  // The blog index is the root here, and the internal /pt prefix never shows up in the address bar.
  // Also catches www's old blog URLs (/blog, *.html) in case a 301 from www keeps them.
  redirects: async () => [
    { source: '/:file(index|blog)\\.html', destination: '/', permanent: true },
    { source: '/blog', destination: '/', permanent: true },
    { source: '/:locale(en|es|fr)/blog', destination: '/:locale', permanent: true },
    { source: '/:page(.+)\\.html', destination: '/:page', permanent: true },
    { source: '/pt', destination: '/', permanent: true },
    { source: '/pt/:path*', destination: '/:path*', permanent: true },
  ],

  // Portuguese is the default locale and lives at the root: /artigo-x is served by /pt/artigo-x.
  rewrites: async () => [
    { source: '/', destination: '/pt' },
    { source: '/:path((?!(?:en|es|fr|_next)(?:/|$))(?!.*\\.).+)', destination: '/pt/:path' },
  ],
};

export default nextConfig;
