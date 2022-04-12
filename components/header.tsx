import Link from 'next/link';
import Image from 'next/image';
import s from './header.module.css';
import { state } from './state';

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

const Hamburguer: React.FC<{}> = () => {
  const toggleStatus = () => {
    state.isSidenavOpen = !state.isSidenavOpen; 
  };

  return (
    <button className={s.hamburguer} onClick={toggleStatus}>
      <span className={s.bar}></span>
      <span className={s.bar}></span>
      <span className={s.bar}></span>
    </button>
  );
};

const ThemeToggler: React.FC = () => (
  <label className={s.themeToggler} htmlFor="themeToggler" title="toggle dark theme">
    <input type="checkbox" id="themeToggler" />
    <span className={s.themeTogglerSwitcher}></span>
  </label>
);
