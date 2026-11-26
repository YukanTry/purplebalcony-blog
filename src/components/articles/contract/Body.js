import { completedTermRange, fillSpans, fillTemplate } from '@/lib/articleFacts';
import { formatMonths } from '@/lib/format';
import { ArticleBodyFrame } from '@/components/articles/ArticleBodyFrame';

// " In the projects completed to date, terms ranged from 9 to 14 months." — empty when there is no data.
const termSentence = (locale, t, projects) => {
  const range = completedTermRange(projects);
  if (!range) return '';
  return range.min === range.max
    ? fillTemplate(t.termSingle, { months: formatMonths(locale, range.min) })
    : fillTemplate(t.termRange, { min: range.min, max: formatMonths(locale, range.max) });
};

export const ContractBody = ({ locale, t, shared, projects }) => (
  <ArticleBodyFrame locale={locale} shared={shared}>
    <p className="lead">{t.everyInvestmentAtPurple}</p>
    <h2>{t.whatTheAgreementSets}</h2>
    <p>{t.beforeTheProjectReceives}</p>
    <ul>
      <li dangerouslySetInnerHTML={{ __html: t.oneProjectOneAgreement }} />
      <li dangerouslySetInnerHTML={{ __html: fillSpans(t.termSetFromThe, () => termSentence(locale, t, projects)) }} />
      <li dangerouslySetInnerHTML={{ __html: t.theDeveloperSOwn }} />
    </ul>
    <h2>{t.whatTheAgreementIs}</h2>
    <p>{t.itIsImportantTo}</p>
    <h2>{t.howYouFollowIt}</h2>
    <p>{t.onceYouHaveSigned}</p>
    <h2>{t.whatAboutTaxes}</h2>
    <p>{t.incomeIsSubjectTo}</p>
  </ArticleBodyFrame>
);
