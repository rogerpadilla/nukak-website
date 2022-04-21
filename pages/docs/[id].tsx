import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Layout } from '../../components/layout';
import { Sidenav } from '../../components/sidenav';
import { Pager } from '../../components/pager';
import { Code } from '../../components/code';
import { getFiles } from '../../utils/files';
import { buildSidenavItems } from '../../utils/ui';
import { FileMetadata, SidenavItem } from '../../types';
import s from './[id].module.css';

const components = {
  code: Code,
} as const;

const Doc = ({ doc, items }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title={doc.title}>
    <Sidenav category="docs" items={items} />
    <article className={s.article}>
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
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
