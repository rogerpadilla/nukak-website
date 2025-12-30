import fs from 'fs';

import { getFileIds } from './files';

function generate() {
  const baseUrl = 'https://uql.app';
  const ids = getFileIds();
  const urls = ids.map((id) => `${baseUrl}/docs/${id}`);
  const lastMod = new Date().toISOString().split('T')[0];

  const xml =
    /*xml */
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${lastMod}</lastmod>
      </url>
      ${urls
      .map(
        (url) => /*xml */ `
            <url>
              <loc>${url}</loc>
              <lastmod>${lastMod}</lastmod>
            </url>
          `
      )
      .join('')}
    </urlset>
  `;

  fs.writeFileSync('./public/sitemap.xml', xml);
}

generate();
