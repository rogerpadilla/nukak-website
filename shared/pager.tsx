import Link from 'next/link';
import type { SidenavItem } from '../types';
import s from './pager.module.css';

export const Pager: React.FC<{ currentId: string; items: SidenavItem[] }> = ({ currentId, items }) => {
  const flatItems = items.reduce((acc, item) => {    
    if (item.items) {
      acc.push(...item.items);
    } else {
      acc.push(item);
    }
    return acc;
  }, [] as SidenavItem[]);
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
