import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';
import '../styles/index.css';
import { AvailabilityProvider } from 'src/providers/availabilityContext';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CampFindr</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <AvailabilityProvider>
          <Component {...pageProps} />
        </AvailabilityProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
