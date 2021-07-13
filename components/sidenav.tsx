import Link from 'next/link';
import styles from './sidenav.module.css';

export const Sidenav: React.FC<{ category: string; items: SidenavItem[]; className: string }> = ({
  category,
  items,
  className,
}) => {
  return (
    <section className={[styles.sidenav, className].join(' ')}>
      <ul>
        {items.map(({ id, title }) => (
          <li key={id}>
            <Link href={`/${category}/${id}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export interface SidenavItem {
  readonly id?: string;
  readonly title?: string;
}
