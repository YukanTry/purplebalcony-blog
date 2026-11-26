import { env, isSupabaseConfigured } from '@/config/env';
import { AppError } from '@/server/http/AppError';

// PostgREST over fetch with the publishable key: same role and RLS as the legacy browser calls, but server-side.
const TIMEOUT_MS = 8000;

const authHeaders = () => ({
  apikey: env.SUPABASE_PUBLISHABLE_KEY,
  Authorization: `Bearer ${env.SUPABASE_PUBLISHABLE_KEY}`,
});

export const storageUrl = (bucket, path) => `${env.SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;

export const selectRows = async (table, query, { revalidate } = {}) => {
  if (!isSupabaseConfigured) throw new AppError('SUPABASE_NOT_CONFIGURED', 'Supabase is not configured', 503);
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/${table}?${query}`, {
    headers: authHeaders(),
    next: { revalidate },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new AppError('UPSTREAM_ERROR', `Supabase select on ${table} failed (${res.status})`, 502);
  return res.json();
};

// return=minimal: anonymous inserts are not allowed to read the row back under RLS.
export const insertRow = async (table, row) => {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify(row),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new AppError('UPSTREAM_ERROR', `Supabase insert on ${table} failed (${res.status})`, 502);
};
