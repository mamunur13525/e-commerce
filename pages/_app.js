import Head from 'next/head';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast'
import { useProgressStore } from '../store/createStore';
import '../styles/globals.css'
import { useNProgress } from '@tanem/react-nprogress'
import Progress from '../components/Shared/ProgressAnimation/Progress';
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const isAnimating = useProgressStore((state) => (state.isAnimating));
  const setIsAnimating = useProgressStore((state) => (state.setIsAnimating));
  const router = useRouter();


  useEffect(() => {

    const handleRouteON = (url) => {
      setIsAnimating(true)
    }
    const handleRouteOff = (url) => {
      setIsAnimating(false)
    }

    router.events.on('routeChangeStart', handleRouteON)
    router.events.on('routeChangeComplete', handleRouteOff)
    router.events.on('routeChangeError', handleRouteOff)

    return () => {
      router.events.off('routeChangeStart', handleRouteON)
      router.events.off('routeChangeComplete', handleRouteOff)
      router.events.off('routeChangeError', handleRouteOff)
    }
  }, [])
  return (
    <>
      <Head>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.js' />
      </Head>
      <Progress isAnimating={isAnimating} key={0} />
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <Toaster
        position="top-center"
      />
    </>
  )
}

export default MyApp