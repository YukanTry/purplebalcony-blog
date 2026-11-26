import { cache } from 'react';
import { isSupabaseConfigured } from '@/config/env';
import { normalizeProjects } from '@/lib/projects';
import { findProjects, findProjectTitles, findHeroMedia, projectMediaUrl } from '@/server/repositories/projects.repository';

// null when Supabase fails or is not configured: the pages show "data unavailable" instead of breaking.
export const getProjects = cache(async () => {
  if (!isSupabaseConfigured) return null;
  try {
    const optional = (promise) => promise.catch(() => []);
    const [rows, titles, media] = await Promise.all([findProjects(), optional(findProjectTitles()), optional(findHeroMedia())]);
    if (!rows?.length) return null;
    return normalizeProjects(rows, titles, media, projectMediaUrl);
  } catch (error) {
    console.error('[getProjects]', error);
    return null;
  }
});
