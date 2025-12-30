/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  pageExtensions: ['tsx', 'md'],
  images: {
    unoptimized: true,
  },
};

export default config;