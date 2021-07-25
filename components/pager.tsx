import Link from 'next/link';
import { FileMetadata } from '../types';

import styles from './pager.module.css';

export const Pager: React.FC<{ currentId: string; items: FileMetadata[] }> = ({ currentId, items }) => {
  const index = items.findIndex((it) => it.id === currentId);
  const prev = items[index - 1];
  const next = items[index + 1];

  return (
    <div className={styles.pager}>
      {prev && (
        <Link href={`/docs/${prev.id}`}>
          <a className={styles.prev} title="previous">
            {prev.title}
          </a>
        </Link>
      )}
      {next && (
        <Link href={`/docs/${next.id}`}>
          <a className={styles.next} title="next">
            {next.title}
          </a>
        </Link>
      )}
    </div>
  );
};
