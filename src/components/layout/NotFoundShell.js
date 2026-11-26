'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { DEFAULT_LOCALE, HTML_LANG, isLocale } from '@/i18n/config';
import { commonMessages } from '@/i18n/messages/common';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { NotFoundContent } from '@/components/layout/NotFoundContent';

const noSubscription = () => () => {};
const urlLocale = () => {
  const first = window.location.pathname.split('/')[1];
  return isLocale(first) ? first : DEFAULT_LOCALE;
};

// The global 404 gets no params and no pathname on the server: it renders in Portuguese (x-default)
// and switches to the URL's locale on the client, without a hydration mismatch.
export const NotFoundShell = () => {
  const locale = useSyncExternalStore(noSubscription, urlLocale, () => DEFAULT_LOCALE);
  const t = commonMessages[locale];

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale];
  }, [locale]);

  return (
    <>
      <Nav locale={locale} t={t} />
      <NotFoundContent locale={locale} />
      <Footer locale={locale} t={t} />
    </>
  );
};
