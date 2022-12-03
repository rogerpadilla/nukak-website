import Link from 'next/link';
import Image from 'next/image';
import s from './header.module.css';
import { useSnapshot } from 'valtio';
import { state } from '../state';

export const Header: React.FC = () => (
  <header className={s.header}>
    <nav className={s.nav}>
      <Link href="/docs" className={[s.item, s.logo].join(' ')}>
        <Image src="/logo.svg" width="28" height="28" alt="nukak" />
        <span>nukak</span>
      </Link>
      <SidenavToggler />
      <ThemeToggler />
      <a
        className={s.item}
        href="https://github.com/rogerpadilla/nukak"
        title="github"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src="/github-logo.svg" width="20" height="20" alt="github" />
      </a>
    </nav>
  </header>
);

function SidenavToggler() {
  const snap = useSnapshot(state);

  const toggleStatus = () => {
    state.isSidenavOpen = !snap.isSidenavOpen;
  };

  return (
    <button className={s.sidenavToggler} onClick={toggleStatus} id="sidenavToggler">
      <span className={s.bar}></span>
      <span className={s.bar}></span>
      <span className={s.bar}></span>
    </button>
  );
}

function ThemeToggler() {
  const snap = useSnapshot(state);

  const toggleTheme = () => {
    state.theme = snap.theme === 'dark' ? 'light' : 'dark';
  };

  return (
    <label className={s.themeToggler} htmlFor="themeToggler" title="toggle dark theme" onClick={toggleTheme}>
      <input type="checkbox" onChange={() => undefined} checked={snap.theme === 'dark'} />
      <span className={s.themeTogglerSwitcher}></span>
    </label>
  );
}
