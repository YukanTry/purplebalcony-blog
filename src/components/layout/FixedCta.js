'use client';

import { useEffect, useState } from 'react';
import { APP_URL } from '@/lib/organization';

// Mobile-only button: shows once `start` is scrolled past, hides when `end` comes into view.
export const FixedCta = ({ label, href = `${APP_URL}/registar`, start = '.hero', end = '#fim' }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const startEl = document.querySelector(start);
      const endEl = document.querySelector(end);
      const passedStart = startEl ? startEl.getBoundingClientRect().bottom < 0 : false;
      const atEnd = endEl ? endEl.getBoundingClientRect().top < window.innerHeight : false;
      setVisible(passedStart && !atEnd);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [start, end]);

  return (
    <div className={`cta-fixo${visible ? ' visivel' : ''}`} id="cta-fixo">
      <a className="btn btn-gold" href={href}>{label}</a>
    </div>
  );
};
