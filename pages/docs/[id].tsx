import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import ReactMarkdown from 'react-markdown';
// const images = require('remark-images');
// import emoji from 'remark-emoji';
const gfm = require('remark-gfm');
import { Layout } from '../../components/layout';
import { Sidenav } from '../../components/sidenav';
import { Pager } from '../../components/pager';
import { Code } from '../../components/code';
import { getFile, getFiles } from '../../utils/files';
import { buildSidenavItems } from '../../utils/ui';
import { FileMetadata } from '../../types';
import s from './[id].module.css';

const components = {
  code: Code,
} as const;

export default function Doc({ docs, doc }: InferGetStaticPropsType<typeof getStaticProps>) {
  const items = buildSidenavItems(docs, doc.id);
  return (
    <Layout title={doc.title} mainClassName={s.main}>
      <Sidenav category="docs" items={items} className={s.sidenav} />
      <article className={s.article}>
        <ReactMarkdown children={doc.body} components={components} plugins={[gfm]} />
        <Pager currentId={doc.id} items={docs} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = await getFiles();
  const paths = docs.map((doc) => ({
    params: { id: doc.id },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{
  docs: FileMetadata[];
  doc: FileMetadata;
}> = async ({ params }) => {
  const [doc, docs] = await Promise.all([getFile(params.id as string, true), getFiles()]);
  return {
    props: {
      docs,
      doc,
    },
  };
};
