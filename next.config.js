module.exports = {
  pageExtensions: ['tsx', 'md'],
  images: {
    loader: 'imgix',
    path: '',
  },
  async redirects() {
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
