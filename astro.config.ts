import { defineConfig, type AstroUserConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

const config: AstroUserConfig = {
    site: 'https://uql.app',

    integrations: [
        starlight({
            title: 'UQL',
            tagline: 'The smartest ORM for TypeScript',
            logo: {
                src: './src/assets/logo.svg',
                replacesTitle: true,
            },
            social: [
                { icon: 'github', label: 'GitHub', href: 'https://github.com/rogerpadilla/uql' }
            ],
            sidebar: [
                {
                    label: 'Introduction',
                    items: [{ label: 'Getting Started', link: '/getting-started' }],
                },
                {
                    label: 'Entities',
                    autogenerate: { directory: 'entities' },
                },
                {
                    label: 'Querying',
                    autogenerate: { directory: 'querying' },
                },
                {
                    label: 'Advanced',
                    items: [
                        { label: 'Declarative Transactions', link: '/transactions-declarative' },
                        { label: 'Imperative Transactions', link: '/transactions-imperative' },
                        { label: 'Migrations', link: '/migrations' },
                        { label: 'Naming Strategy', link: '/naming-strategy' },
                    ],
                },
                {
                    label: 'Plugins',
                    items: [
                        { label: 'Express', link: '/plugins-express' },
                        { label: 'Browser', link: '/plugins-browser' },
                    ],
                },
            ],
            customCss: ['./src/styles/custom.css'],
        }),
        react(),
    ],

    adapter: vercel(),
};

export default defineConfig(config);