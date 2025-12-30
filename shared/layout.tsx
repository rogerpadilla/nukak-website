import Head from 'next/head';
import Script from 'next/script';
import { projectDescription, projectName } from '~/shared/constants';
import { Header } from './header';
import s from './layout.module.css';

export const Layout: React.FC<{
  title?: string;
  description?: string;
  mainClassName?: string;
  children: React.ReactNode;
}> = ({ title, description, mainClassName, children }) => {
  const fullTitle = title ? `${title} | ${projectName}` : projectName;
  const fullDescription = description ?? projectDescription;

  return (
    <>
      <Head>
        <link rel="icon" href="/logo.svg" />
        <title>{fullTitle}</title>
        <meta name="description" content={fullDescription} />
        <meta name="og:title" content={fullTitle} />
        <meta name="og:description" content={fullDescription} />
        <meta property="og:image" content="/logo.svg" />
      </Head>
      <Header />
      <main className={[s.main, mainClassName].join(' ')}>
        <Script strategy="afterInteractive" src="/gtag.js"></Script>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-PE9RVX8QYB"></Script>
        {children}
      </main>
    </>
  );
};
