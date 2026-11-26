// For the few places that build HTML strings (map popups and pins, filled rich text).
const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ESCAPES[c]);

// CSS url() value safe inside a style attribute.
export const cssUrl = (url) => `url(&quot;${escapeHtml(url)}&quot;)`;
