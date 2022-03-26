module.exports = {
  pageExtensions: ['tsx', 'md'],
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/docs/quick-start',
        permanent: true,
      },
      {
        source: '/docs',
        destination: '/docs/quick-start',
        permanent: true,
      },
    ];
  },
};
