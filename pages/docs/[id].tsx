import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { FileMetadata, getFile, getFiles } from '../../utils/files';
import { Layout } from '../../components/layout';
import { Sidenav } from '../../components/sidenav';
import styles from './[id].module.css';

export default function Doc({ docs, doc }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title={doc.title}>
      <Sidenav category='docs' items={docs} className={styles.sidenav} />

      <article className={styles.article}>
        <h1>{doc.title}</h1>
        <MDXRemote {...doc.body} />
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
