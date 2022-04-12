import Link from 'next/link';
import Image from 'next/image';
import s from './header.module.css';
import { Hamburguer } from './hamburguer';
import { ThemeToggler } from './themeToggler';

export const Header: React.FC = () => (
  <header className={s.header}>
    <nav className={s.nav}>
      <Link href="/docs/quick-start">
        <a className={s.logo}>
          <Image src="/logo.svg" width="28" height="28" alt="uql" />
          <span>uql</span>
        </a>
      </Link>
      <Hamburguer />
      <ThemeToggler />
      <a href="https://github.com/rogerpadilla/uql" title="github" target="_blank" rel="noopener noreferrer">
        <Image src="/github-logo.svg" width="20" height="20" alt="github" />
      </a>
      <a href="https://www.npmjs.com/package/@uql/core" title="npm" target="_blank" rel="noopener noreferrer">
        <Image src="/npm-logo.webp" width="28" height="28" alt="npm" />
      </a>
    </nav>
  </header>
);
