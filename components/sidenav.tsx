import Link from 'next/link';
import styles from './sidenav.module.css';

export const Sidenav: React.FC<{ category: string; items: SidenavItem[] }> = ({ category, items }) => {
  return (
    <section className={styles.sidenav}>
      <ol>
        {items.map(({ id, title }) => (
          <li key={id}>
            <Link href={`/${category}/${id}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
};

export interface SidenavItem {
  readonly id?: string;
  readonly title?: string;
}
