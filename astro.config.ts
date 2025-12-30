import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import type { AstroUserConfig } from 'astro';

import { projectDescription, githubRepo } from './src/constants';

const config: AstroUserConfig = {
    site: 'https://uql.app',
    integrations: [
        starlight({
            title: 'UQL',
            favicon: '/logo.svg',
            tagline: 'The smartest ORM for TypeScript',
            description: projectDescription,
            head: [
                {
                    tag: 'script',
                    attrs: {
                        src: 'https://www.googletagmanager.com/gtag/js?id=G-PE9RVX8QYB',
                        async: true,
                    },
                },
                {
                    tag: 'script',
                    content: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PE9RVX8QYB');
          `,
                },
            ],
            logo: {
                src: './src/assets/logo.svg',
                replacesTitle: true,
            },
            editLink: {
                baseUrl: `${githubRepo}/edit/main/apps/website/`,
            },
            lastUpdated: true,
            social: [
                { icon: 'github', label: 'GitHub', href: githubRepo },
                { icon: 'rocket', label: 'NPM', href: 'https://www.npmjs.com/package/@uql/core' }
            ],
            tableOfContents: {
                minHeadingLevel: 2,
                maxHeadingLevel: 3,
            },
            sidebar: [
                {
                    label: 'Getting Started',
                    link: '/getting-started',
                    badge: { text: 'Start here', variant: 'success' },
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
            expressiveCode: {
                themes: ['dracula', 'github-light'],
                useThemedScrollbars: false,
            },
        }),
        react(),
    ],

    adapter: vercel(),
};

export default defineConfig(config);