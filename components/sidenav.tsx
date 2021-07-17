import Link from 'next/link';
import { FileMetadata } from '../utils/files';
import styles from './sidenav.module.css';

export const Sidenav: React.FC<{ category: string; index: number; items: FileMetadata[]; className: string }> = ({
  category,
  index,
  items,
  className,
}) => {
  return (
    <aside className={[styles.sidenav, className].join(' ')}>
      <ul>
        {items.map(({ id, title }, idx) => (
          <li key={id}>
            <Link href={`/${category}/${id}`}>
              <a className={idx === index ? styles.activeLink : styles.link}>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};
