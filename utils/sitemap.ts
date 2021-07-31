import fs from 'fs';
import path from 'path';

import { getFileIds as g} from './files';

const docsDirectory = path.join(process.cwd(), 'docs');


function generate() {
  const baseUrl = 'https://uql.io';
  const ids = g();
  const urls = ids.map((id) => `${baseUrl}/docs/${id}`);
  const lastMod = new Date().toISOString();

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

function getFileIds(): string[] {
  return fs.readdirSync(docsDirectory).map((filePath) => getFileId(filePath));
}

function getFileId(fileName: string): string {
  return fileName.replace(/\.md$/, '');
}

generate();
