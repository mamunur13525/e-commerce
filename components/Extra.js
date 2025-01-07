
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { Metadata, cartStore, queryStore, useProgressStore } from '../store/createStore';
import Progress from '../components/Shared/ProgressAnimation/Progress';

const Extra = () => {
    const isAnimating = useProgressStore((state) => (state.isAnimating));
    const setIsAnimating = useProgressStore((state) => (state.setIsAnimating));
    const setMetadata = Metadata((state) => (state.setMetadata));
    const router = useRouter();
    const cartItem = cartStore((state) => (state.items));
    const setCartItems = cartStore((state) => (state.setCartItems));
    const firstRender = useRef(false);
    const secondRender = useRef(false);

    // Set cart items from localstorage
    useEffect(() => {
        setCartItems(JSON.parse(localStorage.getItem('cartItems')) || []);
        firstRender.current = true;
    }, []);

    useEffect(() => {
        if (firstRender.current === true) {
            if (secondRender.current === true) {
                localStorage.setItem('cartItems', JSON.stringify(cartItem));
            } else {
                secondRender.current = true;
            }
        }
    }, [cartItem]);

    const setQuery = queryStore((state) => (state.setQuery));
    const queryRef = useRef(false);

    useEffect(() => {
        if (Object.keys(router.query).length > 0 && queryRef.current === false) {
            setQuery(router.query);
            queryRef.current = true;
        }
    }, [router]);

    useEffect(() => {
        if (router.asPath !== '/login') {
            if (router.asPath !== '/signup') {
                localStorage.setItem('path', router.asPath);
            }
        }
    }, [router?.asPath]);

    useEffect(() => {
        const handleRouteON = (url) => {
            setIsAnimating(true);
        };
        const handleRouteOff = (url) => {
            setIsAnimating(false);
        };

        router.events.on('routeChangeStart', handleRouteON);
        router.events.on('routeChangeComplete', handleRouteOff);
        router.events.on('routeChangeError', handleRouteOff);

        return () => {
            router.events.off('routeChangeStart', handleRouteON);
            router.events.off('routeChangeComplete', handleRouteOff);
            router.events.off('routeChangeError', handleRouteOff);
        };
    }, []);

    // Getting metadata
    useEffect(() => {
        try {
            fetch('/api/get-metadata')
                .then(res => res.json())
                .then(result => {
                    if (!result.error) {
                        setMetadata(result);
                    } else {
                        console.log(result.error || 'Something went wrong.');
                    }
                });
        } catch (error) {
            console.log(error.message);
        }
    }, []);
    return (
        <Progress isAnimating={isAnimating} key={0} />
    )
}

export default Extra