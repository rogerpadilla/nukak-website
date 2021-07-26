import Head from 'next/head';
import { projectName } from '../utils/constants';
import { Header } from './header';
import s from './layout.module.css';

export const Layout: React.FC<{
  title?: string;
  mainClassName?: string;
  children: React.ReactNode;
}> = ({ title, mainClassName, children }) => {
  const fullTitle = title ? `${title} | ${projectName}` : projectName;

  return (
    <>
      <Head>
        <link rel="icon" href="/logo.svg" />
        <title>{fullTitle}</title>
        <meta name="description" content={fullTitle} />
        <meta name="og:title" content={fullTitle} />
        <meta property="og:image" content={`https://og-image.vercel.app/${encodeURI(fullTitle)}.png`} />
      </Head>
      <Header />
      <main className={[s.main, mainClassName].join(' ')}>{children}</main>
    </>
  );
};
