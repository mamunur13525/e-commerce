import Head from 'next/head';
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react';
import { Toaster } from 'react-hot-toast'
import { cartStore, queryStore, useProgressStore } from '../store/createStore';
import '../styles/globals.css'
import { useNProgress } from '@tanem/react-nprogress'
import Progress from '../components/Shared/ProgressAnimation/Progress';
import { SessionProvider, useSession } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const isAnimating = useProgressStore((state) => (state.isAnimating));
  const setIsAnimating = useProgressStore((state) => (state.setIsAnimating));
  const router = useRouter();
  const cartItem = cartStore((state) => (state.items))
  const setCartItems = cartStore((state) => (state.setCartItems))
  const firstRender = useRef(false)
  const secondRender = useRef(false)


  // set cart items from localstorage
  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem('cartItems')) || [])
    firstRender.current = true
  }, [])

  useEffect(() => {
    if (firstRender.current === true) {
      if(secondRender.current === true) {
        localStorage.setItem('cartItems', JSON.stringify(cartItem))
      }
      else {
        secondRender.current = true
      }
    }
  }, [cartItem])

  const setQuery = queryStore((state) => (state.setQuery))
  const queryRef = useRef(false)

  useEffect(() => {
    if(Object.keys(router.query).length > 0 && queryRef.current === false){
        setQuery(router.query)
        queryRef.current = true
    }
  }, [router])  

  useEffect(() => {
    if(router.asPath !== '/login') {
      if(router.asPath !== '/signup') {
        localStorage.setItem('path', router.asPath)
      }
    }
  }, [router?.asPath])

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