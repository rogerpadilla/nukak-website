module.exports = {
  pageExtensions: ['tsx', 'md', 'mdx'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/docs/getting-started',
        permanent: true,
      },
    ];
  },
};
