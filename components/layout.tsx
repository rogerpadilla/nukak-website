import Head from 'next/head';
import React from 'react';
import { projectName } from '../utils/constants';
import { Header } from './header';
import { Main } from './main';
import { SidenavItem } from './sidenav';

export const Layout: React.FC<{
  title?: string;
  sidenav?: { category: string; items: SidenavItem[] };
  children: React.ReactNode;
}> = ({ title, sidenav, children }) => {
  const fullTitle = title ? `${projectName} | ${title}` : projectName;

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
      <Main sidenav={sidenav}>{children}</Main>
    </>
  );
};
