import Link from 'next/link';
import s from './header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={s.header}>
      <nav className={s.toolbar}>
        <Link href="/">
          <a>
            <img src="/logo.svg" height="30" width="30" alt="uql" />
          </a>
        </Link>
        <a href="https://github.com/impensables/uql" title="github" target="_blank">
          <img src="/github-logo.svg" width="28" height="28" alt="github" />
        </a>
      </nav>
    </header>
  );
};
