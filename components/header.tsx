import Link from 'next/link';
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
      </nav>
    </header>
  );
};
