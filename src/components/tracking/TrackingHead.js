import Script from 'next/script';
import { GTM_ID, META_PIXEL_ID, SEO_PROGRAMATICO_SITE } from '@/lib/tracking';

// Use next/script (afterInteractive) so Next.js App Router actually injects these scripts.
// Raw <script dangerouslySetInnerHTML> inside <head> is silently dropped by the App Router.
const GTM_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

const META_PIXEL_SNIPPET = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`;

export const TrackingHead = () => (
  <>
    <Script id="gtm" strategy="afterInteractive">
      {GTM_SNIPPET}
    </Script>
    <Script id="meta-pixel" strategy="afterInteractive">
      {META_PIXEL_SNIPPET}
    </Script>
    <Script
      src="https://app.seo-programatico.com/an.js"
      data-site={SEO_PROGRAMATICO_SITE}
      strategy="lazyOnload"
    />
  </>
);
