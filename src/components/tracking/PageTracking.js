'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { track } from '@/lib/tracking';

const SCROLL_DEPTHS = [25, 50, 75, 100];
const CTA_SELECTOR = 'a[href*="/registar"], a[href*="app.purplebalcony"], .btn-cta, .cta-btn, [data-track-cta]';

// Pageview + scroll depth per route, CTA clicks site-wide. The first Meta PageView comes from the head snippet.
export const PageTracking = () => {
  const pathname = usePathname();
  const firstView = useRef(true);

  useEffect(() => {
    track('pb_landing_pageview', { page_title: document.title, lang: document.documentElement.lang });
    if (!firstView.current) window.fbq?.('track', 'PageView');
    firstView.current = false;

    const reached = new Set();
    const onScroll = () => {
      const pct = Math.round(((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100);
      SCROLL_DEPTHS.filter((d) => pct >= d && !reached.has(d)).forEach((d) => {
        reached.add(d);
        track(`pb_landing_scroll_${d}`, { depth: d });
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e) => {
      const el = e.target.closest?.(CTA_SELECTOR);
      if (!el) return;
      track('pb_landing_cta_click', {
        cta_label: el.innerText?.trim().slice(0, 80),
        cta_destination: el.href || el.getAttribute('href'),
        page_url: window.location.href,
      });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
};
