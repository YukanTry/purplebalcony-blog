// Server-only environment. Never import this from a client component.
// Supabase is optional: the hosting is managed by the client, so without these vars the blog still
// builds and renders, showing its "data unavailable" fallbacks instead of project data.
const optional = (name) => process.env[name] || null;

export const env = Object.freeze({
  SUPABASE_URL: optional('SUPABASE_URL'),
  SUPABASE_PUBLISHABLE_KEY: optional('SUPABASE_PUBLISHABLE_KEY'),
});

export const isSupabaseConfigured = Boolean(env.SUPABASE_URL && env.SUPABASE_PUBLISHABLE_KEY);

if (!isSupabaseConfigured) {
  console.warn('[env] SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY not set: project data is disabled.');
}
