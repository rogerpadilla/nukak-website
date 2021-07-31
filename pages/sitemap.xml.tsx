import { GetServerSideProps } from 'next';
import { getFileIds } from '../utils/files';

const Sitemap = () => {};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const lastMod = new Date().toISOString();

  const baseUrl = {
    development: 'http://localhost:5000',
    test: 'http://localhost:5000',
    production: 'https://uql.io',
  }[process.env.NODE_ENV];

  const ids = await getFileIds();
  const urls = ids.map((id) => `${baseUrl}/docs/${id}`);

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

  res.setHeader('Content-Type', 'text/xml');
  res.write(xml);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
