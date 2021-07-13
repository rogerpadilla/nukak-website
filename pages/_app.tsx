import { AppProps } from 'next/app';
import '../components/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
