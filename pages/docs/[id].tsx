import type { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Layout } from '../../shared/layout';
import { Sidenav } from '../../shared/sidenav';
import { Pager } from '../../shared/pager';
import { Code } from '../../shared/code';
import { getFiles } from '../../shared/files';
import { buildSidenavItems } from '../../shared/ui';
import { Badges } from '../../shared/badges';
import type { FileMetadata, SidenavItem } from '../../types';
import s from './[id].module.css';

const components = {
  code: Code,
} as const;

const Doc = ({ doc, items }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title={doc.title} description={doc.description}>
    <Sidenav category="docs" items={items} />
    <article className={s.article}>
      {doc.root && <Badges />}
      <ReactMarkdown
        components={components as any}
        rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]}
        remarkPlugins={[remarkGfm]}
      >
        {doc.content}
      </ReactMarkdown>
      <Pager currentId={doc.id} items={items} />
    </article>
  </Layout>
);

export const getStaticProps: GetStaticProps<{ doc: FileMetadata; items: SidenavItem[] }> = ({ params }) => {
  const docs = getFiles();
  const activeId = params.id as string;
  const items = buildSidenavItems(docs, activeId);
  const doc = docs.find((doc) => doc.id === activeId);
  return { props: { doc, items } };
};

export const getStaticPaths: GetStaticPaths = () => {
  const docs = getFiles();
  const paths = docs.map((doc) => ({ params: { id: doc.id } }));
  return { paths, fallback: false };
};

export default Doc;
