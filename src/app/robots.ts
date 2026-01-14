import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/_hackthejam/',
          '/_Pods/',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://madhaus.africa/sitemap.xml',
  }
}
