import { MetadataRoute } from 'next';
import { siteMeta } from '@/content/meta';
import { projects } from '@/content/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/about',
    '/work',
    '/education',
    '/content',
    '/speaking',
  ].map((route) => ({
    url: `${siteMeta.domain}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${siteMeta.domain}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}

