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
        <meta
          name="keywords"
          content="uql,persistence,orm,mongodb,mysql,mariadb,postgres,sqlite,ts,typescript,js,javascript,entity,dao,decorator,repository,service,transaction"
        ></meta>
        <meta name="og:title" content={fullTitle} />
        <meta property="og:image" content="/logo.svg" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PE9RVX8QYB"></script>
        <script async src="/gtag.js"></script>
        <script async src="/main.js"></script>
      </Head>
      <Header />
      <main className={[s.main, mainClassName].join(' ')}>{children}</main>
    </>
  );
};
