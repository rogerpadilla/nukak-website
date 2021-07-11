import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from '../components/CodeBlock';

const mdComponents = {
  h1: (props: any) => <h1 style={{ color: 'tomato' }} {...props} />,
  pre: (props: any) => <div {...props} />,
  code: CodeBlock,
};

export default function App({ Component, pageProps }: { Component?: any; pageProps?: any }) {
  return (
    <MDXProvider components={mdComponents}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}
