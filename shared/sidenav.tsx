import Link from 'next/link';
import type { SidenavItem } from '../types';
import { state } from './state';
import { useSnapshot } from 'valtio';
import s from './sidenav.module.css';

export const Sidenav: React.FC<{ category: string; items: SidenavItem[] }> = ({ category, items }) => {
  const snap = useSnapshot(state);

  const classes = [s.sidenav].concat(snap.isSidenavOpen ? [s.open] : []);

  return (
    <aside className={classes.join(' ')} id="sidenav">
      <List category={category} items={items} />
    </aside>
  );
};

const List: React.FC<{ category: string; items: SidenavItem[] }> = ({ category, items }) => (
  <ul>
    {items.map((it) => (
      <Item key={it.id} category={category} it={it} />
    ))}
  </ul>
);

const Item: React.FC<{ category: string; it: SidenavItem }> = ({ category, it: item }) => (
  <li className={item.isActive ? s.active : ''}>
    <Link href={`/${category}/${item.id}`}>{item.title}</Link>
    {item.items && <List category={category} items={item.items} />}
  </li>
);
