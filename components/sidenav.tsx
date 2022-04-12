import Link from 'next/link';
import { SidenavItem } from '../types';
import s from './sidenav.module.css';
import { state } from './state';
import { useSnapshot } from 'valtio';

export const Sidenav: React.FC<{ category: string; items: SidenavItem[]; className: string }> = ({
  category,
  items,
  className,
}) => {
  const snap = useSnapshot(state)

  const classes = [s.sidenav, className].concat(snap.isSidenavOpen ? [s.open] : []);

  return (
    <aside className={classes.join(' ')}>
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
    <Link href={`/${category}/${item.id}`}>
      <a>{item.title}</a>
    </Link>
    {item.items && <List category={category} items={item.items} />}
  </li>
);
