import Link from 'next/link';
import s from './header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={s.header}>
      <nav className={s.toolbar}>
        <Link href="/">
          <a>
            <img src='/logo.svg' alt="uql" />
          </a>
        </Link>
        <a href="https://github.com/impensables/uql" title="github" target="_blank">
          <img src='/github-logo.svg' alt="github" />
        </a>
      </nav>
    </header>
  );
};
