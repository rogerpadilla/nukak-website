import Link from 'next/link';
import s from './header.module.css';
import { ThemeSwitch } from './themeSwitch';

export const Header: React.FC = () => {
  return (
    <header className={s.header}>
      <nav className={s.toolbar}>
        <Link href="/docs/getting-started">
          <a>
            <img src="/logo.svg" width="30" height="30" alt="uql" />
            <span>uql</span>
          </a>
        </Link>
        <ThemeSwitch />
        <a href="https://github.com/rogerpadilla/uql" title="github" target="_blank" rel="noopener">
          <img src="/github-logo.svg" width="28" height="28" alt="github" />
        </a>
      </nav>
    </header>
  );
};
