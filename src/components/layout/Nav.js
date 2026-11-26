'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LOCALES, LOCALE_NAMES, HTML_LANG, localePath } from '@/i18n/config';
import { APP_URL, wwwUrl } from '@/lib/organization';
import { pagePath } from '@/lib/pagePath';

const SOLID_AFTER_PX = 40;

// Every page except the blog lives on www: those are absolute links, the blog ones stay inside the subdomain.
export const Nav = ({ locale, t }) => {
  const path = pagePath(usePathname());
  const inBlog = path === '/' || path.startsWith('/artigo-');
  const [openDrop, setOpenDrop] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SOLID_AFTER_PX);
    // React also listens on document, so stopPropagation can't shield the toggle buttons from this listener:
    // skip their clicks here instead. Any other click (outside, or on a link inside a dropdown) closes it.
    const closeDrops = (e) => {
      if (e.target instanceof Element && e.target.closest('.menu-drop > button')) return;
      setOpenDrop(null);
    };
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setOpenDrop(null);
      setMenuOpen(false);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('click', closeDrops);
    document.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', closeDrops);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const blogHref = localePath(locale, '/');
  const blogActive = inBlog ? 'ativo' : undefined;
  const blogCurrent = path === '/' ? 'page' : undefined;
  const dropClass = (name, extra = '') => `menu-drop${extra}${openDrop === name ? ' aberto' : ''}`;
  const toggleDrop = (name) => () => setOpenDrop((open) => (open === name ? null : name));
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`nav${scrolled || menuOpen ? ' solida' : ''}`} id="nav">
      <div className="wrap">
        <a className="logo" href={wwwUrl('/')} aria-label={t.homeAria}>
          <Image src="/logo-nav.png" alt="Purple Balcony" width={53} height={44} loading="eager" />
        </a>
        <ul className="nav-centro">
          <li><a href={wwwUrl('/investors')}>{t.investors}</a></li>
          <li><a href={wwwUrl('/become-a-partner')}>{t.becomePartner}</a></li>
          <li className={dropClass('main')}>
            <button type="button" aria-expanded={openDrop === 'main'} aria-haspopup="true" onClick={toggleDrop('main')}>
              #Purplebalcony<span className="chev" aria-hidden="true"></span>
            </button>
            <div className="drop">
              <a href={wwwUrl('/who-we-are')}>{t.whoWeAre}</a>
              <Link href={blogHref} className={blogActive} aria-current={blogCurrent}>{t.blog}</Link>
              <a href={wwwUrl('/investors#historico')}>{t.completedProjects}</a>
              <a href={wwwUrl('/#contacto')}>{t.contact}</a>
            </div>
          </li>
        </ul>
        <div className="nav-acoes">
          <div className={dropClass('lang', ' lang')}>
            <button type="button" aria-expanded={openDrop === 'lang'} aria-haspopup="true" aria-label={t.languageAria} onClick={toggleDrop('lang')}>
              <span>{locale.toUpperCase()}</span><span className="chev" aria-hidden="true"></span>
            </button>
            <div className="drop">
              {LOCALES.map((l) => (
                <a key={l} href={localePath(l, path)} hrefLang={HTML_LANG[l]} lang={HTML_LANG[l]} aria-current={l === locale ? 'true' : undefined}>
                  {LOCALE_NAMES[l]}
                </a>
              ))}
            </div>
          </div>
          <a className="nav-login" href={`${APP_URL}/login`}>{t.clientAccess}</a>
          <a className="btn btn-gold nav-registar" href={`${APP_URL}/registar`}>{t.signUp}</a>
          <button className="nav-menu" type="button" aria-expanded={menuOpen} aria-controls="menu-movel" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? t.close : t.menu}
          </button>
        </div>
      </div>
      <nav className="menu-movel" id="menu-movel" aria-label="Menu" hidden={!menuOpen}>
        <a href={wwwUrl('/investors')} onClick={closeMenu}>{t.investors}</a>
        <a href={wwwUrl('/become-a-partner')} onClick={closeMenu}>{t.becomePartner}</a>
        <a href={wwwUrl('/who-we-are')} onClick={closeMenu}>{t.whoWeAre}</a>
        <Link href={blogHref} aria-current={blogCurrent} onClick={closeMenu}>{t.blog}</Link>
        <a href={wwwUrl('/investors#historico')} onClick={closeMenu}>{t.completedProjects}</a>
        <a href={wwwUrl('/#contacto')} onClick={closeMenu}>{t.contact}</a>
        <div className="menu-movel-lang" role="group" aria-label={t.languageGroupAria}>
          {LOCALES.map((l) => (
            <button key={l} type="button" aria-current={l === locale ? 'true' : undefined} onClick={() => window.location.assign(localePath(l, path))}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="menu-movel-acoes">
          <a className="btn btn-outline" href={`${APP_URL}/login`}>{t.clientAccess}</a>
          <a className="btn btn-gold" href={`${APP_URL}/registar`}>{t.signUp}</a>
        </div>
      </nav>
    </header>
  );
};
