'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { APP_URL } from '@/lib/organization';
import { formatCompactEuros } from '@/lib/format';
import { fundedPercent, projectName } from '@/lib/projects';

const ModalContext = createContext({ openProject: () => {} });

export const useProjectModal = () => useContext(ModalContext);

const BADGE_COLORS = {
  completed: { background: '#ECFDF5', color: '#065F46' },
  open: { background: '#D1FAE5', color: '#065F46' },
  analysis: { background: '#FEF3C7', color: '#92400E' },
};
const DEFAULT_BADGE = { background: '#EDE9FE', color: '#5B21B6' };

const s = {
  overlay: { display: 'block', position: 'fixed', inset: 0, background: 'rgba(0,0,0,.65)', zIndex: 9000, padding: '20px', overflowY: 'auto' },
  inner: { maxWidth: '520px', margin: '40px auto', background: '#fff', borderRadius: '20px', overflow: 'hidden', position: 'relative' },
  close: { position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,.45)', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '20px', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, fontFamily: 'sans-serif' },
  photo: { height: '200px', overflow: 'hidden' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  noPhoto: { height: '140px', background: 'linear-gradient(135deg,#4C1D95,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' },
  body: { padding: '22px 24px 28px' },
  head: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' },
  address: { fontSize: '12px', color: '#888', marginBottom: '3px' },
  name: { fontSize: '17px', fontWeight: 700, color: '#1a1a2e', lineHeight: 1.2 },
  badge: { padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 },
  progress: { margin: '16px 0 0' },
  progressRow: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#888', marginBottom: '5px' },
  bar: { height: '6px', background: '#e5e7eb', borderRadius: '3px' },
  metrics: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '16px' },
  metric: { background: '#f8f7ff', borderRadius: '10px', padding: '12px 10px', textAlign: 'center' },
  metricLabel: { fontSize: '11px', color: '#888', marginBottom: '4px' },
  primary: { display: 'block', background: '#4C1D95', color: '#fff', textAlign: 'center', padding: '14px', borderRadius: '10px', fontWeight: 600, fontSize: '15px', textDecoration: 'none', marginTop: '20px' },
  secondary: { display: 'block', textAlign: 'center', padding: '8px', fontSize: '13px', color: '#888', textDecoration: 'none', marginTop: '4px' },
};

const ModalContent = ({ project: p, locale, t, onClose }) => {
  const name = projectName(p, locale) || t.project;
  const isOpen = p.status === 'open';
  const isCompleted = p.status === 'completed';
  const progress = fundedPercent(p);
  const metrics = [
    p.roi !== null && { label: t.modal.return, value: `${p.roi.toFixed(1)}%`, gold: true },
    p.duration !== null && { label: t.modal.duration, value: `${p.duration} ${t.months}` },
    p.minInvestment !== null && !isCompleted && { label: t.modal.minInvestment, value: formatCompactEuros(p.minInvestment) },
    p.target !== null && { label: isCompleted ? t.modal.totalRaised : t.modal.target, value: formatCompactEuros(p.target) },
  ].filter(Boolean);

  return (
    <>
      {p.image ? (
        // eslint-disable-next-line @next/next/no-img-element -- legacy modal markup, image already sized by CSS
        <div style={s.photo}><img src={p.image} alt={name} style={s.img} /></div>
      ) : (
        <div style={s.noPhoto}>🏘</div>
      )}
      <div style={s.body}>
        <div style={s.head}>
          <div>
            {p.address && <div style={s.address}>📍 {p.address}</div>}
            <div style={s.name}>{name}</div>
          </div>
          <span style={{ ...s.badge, ...(BADGE_COLORS[p.status] ?? DEFAULT_BADGE) }}>{t.statusTitle[p.status] ?? t.statusTitle.draft}</span>
        </div>
        {(isOpen || isCompleted) && p.target > 0 && (
          <div style={s.progress}>
            <div style={s.progressRow}>
              <span>{t.funded} {progress}%</span>
              <span>{formatCompactEuros(p.raised || 0)} / {formatCompactEuros(p.target)}</span>
            </div>
            <div style={s.bar}><div style={{ height: '100%', width: `${progress}%`, background: '#4C1D95', borderRadius: '3px' }}></div></div>
          </div>
        )}
        <div style={s.metrics}>
          {metrics.map((m) => (
            <div key={m.label} style={s.metric}>
              <div style={s.metricLabel}>{m.label}</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: m.gold ? '#B8860B' : '#1a1a2e' }}>{m.value}</div>
            </div>
          ))}
        </div>
        {isOpen && (
          <>
            <a href={`${APP_URL}/sign-up`} style={s.primary}>{t.modal.createAndInvest}</a>
            <a href={`${APP_URL}/login`} style={s.secondary}>{t.modal.haveAccount}</a>
          </>
        )}
        {!isOpen && !isCompleted && <a href={`${APP_URL}/sign-up`} style={s.primary}>{t.modal.registerNotified}</a>}
      </div>
      <button type="button" onClick={onClose} style={s.close} aria-label={t.modal.close}>&times;</button>
    </>
  );
};

// Wrap any page that shows project cards; cards call useProjectModal().openProject(project).
export const ProjectModalProvider = ({ locale, t, children }) => {
  const [project, setProject] = useState(null);
  const openProject = useCallback((p) => setProject(p), []);
  const close = useCallback(() => setProject(null), []);

  useEffect(() => {
    if (!project) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [project, close]);

  return (
    <ModalContext.Provider value={{ openProject }}>
      {children}
      {project && (
        <div id="pb-modal" style={s.overlay} onClick={(e) => { if (e.target === e.currentTarget) close(); }} role="dialog" aria-modal="true" aria-label={projectName(project, locale) || t.project}>
          <div id="pb-modal-inner" style={s.inner}>
            <ModalContent project={project} locale={locale} t={t} onClose={close} />
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
