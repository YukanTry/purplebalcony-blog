import Link from 'next/link';
import { localePath } from '@/i18n/config';
import { APP_URL, CONTACT, wwwUrl } from '@/lib/organization';

// Only the blog link stays on the subdomain; the rest of the site lives on www.
export const Footer = ({ locale, t }) => {
  return (
    <footer>
      <div className="wrap">
        <div className="rodape">
          <div>
            <span className="logo"><span>Purple Balcony</span></span>
            <p className="lema">Real Estate with a Vision · Barreiro, Portugal · 2019</p>
            <p style={{ marginTop: '12px' }}>
              <a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneLabel}</a><br /><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
            <p style={{ marginTop: '12px' }}>
              <a href={CONTACT.linkedin}>LinkedIn</a> · <a href={CONTACT.instagram}>Instagram</a>
            </p>
          </div>
          <div>
            <h3>{t.platform}</h3>
            <ul>
              <li><a href={wwwUrl('/investors')}>{t.opportunities}</a></li>
              <li><a href={wwwUrl('/investors#historico')}>{t.trackRecord}</a></li>
              <li><a href={wwwUrl('/#como-funciona')}>{t.howItWorks}</a></li>
              <li><Link href={localePath(locale, '/')}>{t.blog}</Link></li>
            </ul>
          </div>
          <div>
            <h3>{t.company}</h3>
            <ul>
              <li><a href={wwwUrl('/who-we-are')}>{t.whoWeAreLower}</a></li>
              <li><a href={wwwUrl('/become-a-partner')}>{t.becomePartnerLower}</a></li>
              <li><a href={wwwUrl('/#contacto')}>{t.contact}</a></li>
            </ul>
          </div>
          <div>
            <h3>{t.legal}</h3>
            <ul>
              <li><a href={`${APP_URL}/registar`}>{t.createAccount}</a></li>
              <li><a href={`${APP_URL}/login`}>{t.login}</a></li>
              <li><a href={wwwUrl('/privacy-policy')}>{t.privacy}</a></li>
              <li><a href={wwwUrl('/terms-and-conditions')}>{t.terms}</a></li>
              <li><a href={wwwUrl('/cookie-policy')}>{t.cookies}</a></li>
              <li><a href={CONTACT.complaintsBook}>{t.complaintsBook}</a></li>
            </ul>
          </div>
        </div>
        <p className="legal">{t.disclaimer}</p>
      </div>
    </footer>
  );
};
