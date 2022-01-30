import Head from 'next/head';
import Script from 'next/script';
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
        <meta
          name="keywords"
          content="orm,data-mapper,persistence,typescript-orm,javascript-orm,mariadb,mariadb-orm,mysql,mysql-orm,postgresql,postgresql-orm,sqlite,sqlite-orm,mongodb,mongodb-orm,entity,dao,transaction,repository,service"
        ></meta>
        <meta name="og:title" content={fullTitle} />
        <meta property="og:image" content="/logo.svg" />
        <script async src="/main.js"></script>
        <script async src="/gtag.js"></script>
      </Head>
      <Header />
      <main className={[s.main, mainClassName].join(' ')}>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-PE9RVX8QYB"></Script>
        {children}
      </main>
    </>
  );
};
