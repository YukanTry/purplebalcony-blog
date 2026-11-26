import '@/styles/base.css';
import { notFound } from 'next/navigation';
import { HTML_LANG, isLocale, localeParams } from '@/i18n/config';
import { commonMessages } from '@/i18n/messages/common';
import { fontVariables } from '@/lib/fonts';
import { SITE_URL } from '@/lib/seo';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { TrackingHead } from '@/components/tracking/TrackingHead';
import { PageTracking } from '@/components/tracking/PageTracking';

// No dynamicParams=false: unknown locales must reach notFound(), served by src/app/global-not-found.js.
export const generateStaticParams = localeParams;

export const viewport = { themeColor: '#3D1A8E', viewportFit: 'cover' };

// The Search Console verification for the subdomain goes here (metadata.verification) once its property exists.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  verification: { google: 'sGbufblyu6H3GRMXPmlTyfojo-kMHG3Cnal7P08CMks' },
};

// The only root layout: same design (base.css), nav and footer as www.
const SiteLayout = async ({ children, params }) => {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = commonMessages[locale];

  return (
    <html lang={HTML_LANG[locale]} className={fontVariables}>
      <head>
        <TrackingHead />
      </head>
      <body>
        <Nav locale={locale} t={t} />
        {children}
        <Footer locale={locale} t={t} />
        <PageTracking />
      </body>
    </html>
  );
};

export default SiteLayout;
