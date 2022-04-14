import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import ReactMarkdown from 'react-markdown';
// const images = require('remark-images');
// import emoji from 'remark-emoji';
import gfm from 'remark-gfm';
import { Layout } from '../../components/layout';
import { Sidenav } from '../../components/sidenav';
import { Pager } from '../../components/pager';
import { Code } from '../../components/code';
import { getFiles } from '../../utils/files';
import { buildSidenavItems } from '../../utils/ui';
import { FileMetadata } from '../../types';
import s from './[id].module.css';

const components = {
  code: Code,
} as const;

export default function Doc({ id, docs }: InferGetStaticPropsType<typeof getStaticProps>) {
  const items = buildSidenavItems(docs, id);
  const doc = docs.find((doc) => doc.id === id);
  return (
    <Layout title={doc.title}>
      <Sidenav category="docs" items={items} />
      <article className={s.article}>
        <ReactMarkdown components={components} remarkPlugins={[gfm]}>
          {doc.content}
        </ReactMarkdown>
        <Pager currentId={doc.id} items={docs} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const docs = getFiles();
  const paths = docs.map((doc) => ({ params: { id: doc.id } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ id: string; docs: FileMetadata[] }> = ({ params }) => {
  const docs = getFiles();
  return { props: { id: params.id as string, docs } };
};
