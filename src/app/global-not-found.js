import '@/styles/base.css';
import '@/styles/pages/not-found.css';
import { fontVariables } from '@/lib/fonts';
import { pageMeta } from '@/i18n/meta';
import { NotFoundShell } from '@/components/layout/NotFoundShell';

// The only root layout sits under [locale], so there is no layout above unmatched URLs:
// Next serves this page for every 404 (and adds noindex itself).
export const metadata = { title: { absolute: pageMeta.notFound.pt.title } };

const GlobalNotFound = () => (
  <html lang="pt-PT" className={fontVariables}>
    <body>
      <NotFoundShell />
    </body>
  </html>
);

export default GlobalNotFound;
