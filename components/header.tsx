import Link from 'next/link';
import Image from 'next/image';
import { projectLogo } from '../utils/constants';
import styles from './header.module.css';
import githubLogo from '../images/github-logo.svg';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.toolbar}>
        <Link href="/">
          <a>{projectLogo}</a>
        </Link>
        <a href="https://github.com/impensables/uql" title="github" target="_blank">
          <Image src={githubLogo} alt="github" />
        </a>
      </nav>
    </header>
  );
};
