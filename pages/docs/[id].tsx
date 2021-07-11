import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import React from 'react';
import { FileMetadata, getFile, getFiles } from '../../utils/files';
import { Layout } from '../../components/layout';

export default function Doc({ doc, docs }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title={doc.title} sidenav={{ category: 'docs', items: docs }}>
      <article>
        <h1>{doc.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: doc.body }} />
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
  doc: FileMetadata;
  docs: FileMetadata[];
}> = async ({ params }) => {
  const [doc, docs] = await Promise.all([getFile(params.id as string, true), getFiles()]);
  return {
    props: {
      doc,
      docs,
    },
  };
};
