import Link from 'next/link';
import { SidenavItem } from '../types';
import s from './pager.module.css';

export const Pager: React.FC<{ currentId: string; items: SidenavItem[] }> = ({ currentId, items }) => {
  const flatItems = items.reduce((acc, item) => {
    if (item.items) {
      acc.push(...item.items);
    }
    return acc;
  }, items.slice());
  const index = flatItems.findIndex((it) => it.id === currentId);
  const prev = flatItems[index - 1];
  const next = flatItems[index + 1];

  return (
    <div className={s.pager}>
      {prev && (
        <Link href={`/docs/${prev.id}`} className={s.prev} title="previous">
          {prev.title}
        </Link>
      )}
      {prev && next && '|'}
      {next && (
        <Link href={`/docs/${next.id}`} className={s.next} title="next">
          {next.title}
        </Link>
      )}
    </div>
  );
};
