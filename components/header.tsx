import Link from 'next/link';
import Image from 'next/image'
import s from './header.module.css';
import { ThemeSwitch } from './themeSwitch';

export const Header: React.FC = () => {
  return (
    <header className={s.header}>
      <nav className={s.toolbar}>
        <Link href="/docs/quick-start">
          <a>
            <Image src="/logo.svg" width="30" height="30" alt="uql" />
            <span>uql</span>
          </a>
        </Link>
        <ThemeSwitch />
        <a href="https://github.com/rogerpadilla/uql" title="github" target="_blank" rel="noopener noreferrer">
          <Image src="/github-logo.svg" width="20" height="20" alt="github" />
        </a>
        <a href="https://www.npmjs.com/package/@uql/core" title="npm" target="_blank" rel="noopener noreferrer">
          <Image src="/npm-logo.webp" width="28" height="28" alt="npm" />
        </a>
      </nav>
    </header>
  );
};
