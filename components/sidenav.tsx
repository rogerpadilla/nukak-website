import Link from 'next/link';
import {  SidenavItem } from '../types';
import styles from './sidenav.module.css';

export const Sidenav: React.FC<{ category: string; items: SidenavItem[]; className: string }> = ({
  category,
  items,
  className,
}) => (
  <aside className={[styles.sidenav, className].join(' ')}>
    <List category={category} items={items} />
  </aside>
);

const List: React.FC<{ category: string; items: SidenavItem[] }> = ({ category, items }) => (
  <ul>
    {items.map((it) => (
      <Item key={it.id} category={category} it={it} />
    ))}
  </ul>
);

const Item: React.FC<{ category: string; it: SidenavItem }> = ({ category, it: item }) => (
  <li>
    <Link href={`/${category}/${item.id}`}>
      <a className={item.isActive ? styles.active : styles.link}>{item.title}</a>
    </Link>
    {item.items && <List category={category} items={item.items} />}
  </li>
);
