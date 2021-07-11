import Link from 'next/link';
import React from 'react';
import styles from './header.module.css';
import { projectLogo } from '../utils/constants';
import utilStyles from './utils.module.css';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.toolbar}>
        <Link href="/">
          <a className={utilStyles.logo}>{projectLogo}</a>
        </Link>
        <Link href="/docs/getting-started">
          <a>Docs</a>
        </Link>
        <Link href="/tutorial">
          <a>Tutorial</a>
        </Link>
        <Link href="/blog">
          <a>Blog</a>
        </Link>
      </nav>
    </header>
  );
};
