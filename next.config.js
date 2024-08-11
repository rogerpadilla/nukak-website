const config = {
  pageExtensions: ['tsx', 'md'],
  redirects() {
    return [
      {
        source: '/',
        destination: '/docs/getting-started',
        permanent: true,
      },
      {
        source: '/docs',
        destination: '/docs/getting-started',
        permanent: true,
      },
    ];
  },
};

export default config;