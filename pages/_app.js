'use server'

import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import { SessionProvider } from "next-auth/react";
import Extra from '../components/Extra';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  

  return (
    <>
      <Head>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.js' />
      </Head>
      <Extra />
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <Toaster position="top-center" />
    </>
  );
}

export default MyApp;
