module.exports = {
  pageExtensions: ['tsx', 'md'],
  swcMinify: true,
  redirects() {
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
