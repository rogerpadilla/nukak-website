import React from 'react';
import type { AppProps } from 'next/app';
import '../shared/globals.css';

if (typeof window === 'undefined') {
  React.useLayoutEffect = React.useEffect;
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
