import { selectRows, storageUrl } from '@/server/supabase';

// Pages are static and regenerate at most every 10 minutes (ISR).
export const PROJECTS_REVALIDATE_SECONDS = 600;

const options = { revalidate: PROJECTS_REVALIDATE_SECONDS };

export const findProjects = () => selectRows('projects', 'select=*&deleted_at=is.null&order=status.asc,created_at.desc', options);

export const findProjectTitles = () => selectRows('project_translations', 'select=project_id,language_code,title', options);

export const findHeroMedia = () => selectRows('project_media', 'select=project_id,file_url&is_hero=eq.true', options);

export const projectMediaUrl = (path) => storageUrl('project-media', path);
