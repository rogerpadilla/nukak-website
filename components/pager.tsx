import Link from 'next/link';
import { FileMetadata } from '../types';

import s from './pager.module.css';

export const Pager: React.FC<{ currentId: string; items: FileMetadata[] }> = ({ currentId, items }) => {
  const index = items.findIndex((it) => it.id === currentId);
  const prev = items[index - 1];
  const next = items[index + 1];

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
