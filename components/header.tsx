import Link from 'next/link';
import Image from 'next/image';
import styles from './header.module.css';
import logo from '../public/logo.svg';
import githubLogo from '../public/github-logo.svg';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.toolbar}>
        <Link href="/">
          <a>
            <Image src={logo} alt="uql" />
          </a>
        </Link>
        <a href="https://github.com/impensables/uql" title="github" target="_blank">
          <Image src={githubLogo} alt="github" />
        </a>
      </nav>
    </header>
  );
};
