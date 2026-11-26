// First-party tracking (Supabase edge function) + the IDs of the third-party tags.
export const GTM_ID = 'GTM-NTGDM5CS';
export const META_PIXEL_ID = '1107440042002357';
export const SEO_PROGRAMATICO_SITE = 'blog.purplebalcony.com';

const TRACK_URL = 'https://xabqystmncbfxfvoqcpm.supabase.co/functions/v1/track-event';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'ref'];

const safely = (fn, fallback = null) => {
  try {
    return fn();
  } catch {
    return fallback;
  }
};

const cookie = (name) => safely(() => document.cookie.match(new RegExp(`${name}=([^;]+)`))?.[1] ?? null);

const sessionId = () => safely(() => {
  let sid = sessionStorage.getItem('pb_sid');
  if (!sid) {
    sid = crypto.randomUUID?.() ?? Date.now().toString(36);
    sessionStorage.setItem('pb_sid', sid);
  }
  return sid;
}, 'unknown');

const fbc = () => {
  const stored = cookie('_fbc');
  if (stored) return stored;
  const fbclid = safely(() => new URLSearchParams(window.location.search).get('fbclid'));
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : null;
};

// Fresh UTMs win and are remembered; otherwise the last stored ones are sent.
export const getUtms = () => safely(() => {
  const params = new URLSearchParams(window.location.search);
  const fresh = Object.fromEntries(UTM_KEYS.filter((k) => params.get(k)).map((k) => [k, params.get(k)]));
  if (Object.keys(fresh).length) {
    localStorage.setItem('pb_utms', JSON.stringify(fresh));
    return fresh;
  }
  return JSON.parse(localStorage.getItem('pb_utms') || '{}');
}, {});

export const track = (eventName, properties = {}) => safely(() => {
  const payload = JSON.stringify({
    event_name: eventName,
    session_id: sessionId(),
    page_url: window.location.href,
    referrer: document.referrer || null,
    fbp: cookie('_fbp'),
    fbc: fbc(),
    ...getUtms(),
    properties,
  });
  if (navigator.sendBeacon) navigator.sendBeacon(TRACK_URL, payload);
  else fetch(TRACK_URL, { method: 'POST', body: payload, keepalive: true }).catch(() => {});
});
