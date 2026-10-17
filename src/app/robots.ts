import { MetadataRoute } from 'next';
import { siteMeta } from '@/content/meta';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${siteMeta.domain}/sitemap.xml`,
  };
}

