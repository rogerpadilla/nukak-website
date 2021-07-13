import { MDXProvider } from '@mdx-js/react';
import Head from 'next/head';
import { projectName } from '../utils/constants';
import CodeBlock from './codeBlock';
import { Header } from './header';
import styles from './layout.module.css';

const mdComponents = {
  h1: (props: object) => <h1 style={{ color: 'tomato' }} {...props} />,
  pre: (props: object) => <div {...props} />,
  code: CodeBlock,
} as const;

export const Layout: React.FC<{
  title?: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  const fullTitle = title ? `${title} | ${projectName}` : projectName;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{fullTitle}</title>
        <meta name="description" content={fullTitle} />
        <meta name="og:title" content={fullTitle} />
        <meta property="og:image" content={`https://og-image.vercel.app/${encodeURI(fullTitle)}.png`} />
      </Head>
      <Header />
      <main className={styles.main}>
        <MDXProvider components={mdComponents}>
          {children}
        </MDXProvider>
      </main>
    </>
  );
};
