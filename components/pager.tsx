import Link from 'next/link';

import styles from './pager.module.css';

import { FileMetadata } from '../utils/files';

export const Pager: React.FC<{ doc: FileMetadata; docs: FileMetadata[] }> = ({ doc, docs }) => {
  const { index } = doc;
  const prev = docs[index - 1];
  const next = docs[index + 1];

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
