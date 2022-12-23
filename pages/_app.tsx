import type { AppProps } from 'next/app';
import '../shared/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
