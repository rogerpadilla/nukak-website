import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import { FileMetadata, getFile, getFiles } from '../../utils/files';
import { Layout } from '../../components/layout';
import { Sidenav } from '../../components/sidenav';
import styles from './[id].module.css';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus as syntaxTheme } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import emoji from 'remark-emoji';
const images = require('remark-images');

const components = {
  code({ inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={syntaxTheme}
        language={match[1]}
        PreTag="div"
        children={String(children).replace(/\n$/, '')}
        {...props}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
} as const;

export default function Doc({ docs, doc }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title={doc.title}>
      <Sidenav category="docs" items={docs} className={styles.sidenav} />

      <article className={styles.article}>
        <h1>{doc.title}</h1>
        <ReactMarkdown children={doc.body} components={components} plugins={[images, emoji]} />
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
