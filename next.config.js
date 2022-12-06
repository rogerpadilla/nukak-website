module.exports = {
  pageExtensions: ['tsx', 'md'],
  redirects() {
    return [
      {
        source: '/',
        destination: '/docs/getting-started',
        permanent: false,
      },
      {
        source: '/docs',
        destination: '/docs/getting-started',
        permanent: false,
      },
    ];
  },
};
