import { cache } from 'react';
import { normalizeProjects } from '@/lib/projects';
import { findProjects, findProjectTitles, findHeroMedia, projectMediaUrl } from '@/server/repositories/projects.repository';

// null when Supabase fails: the pages show "data unavailable" instead of breaking, like the legacy site.
export const getProjects = cache(async () => {
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
