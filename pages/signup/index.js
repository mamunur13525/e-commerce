import Head from 'next/head'
import Footer from '../../components/Shared/Footer/Footer'
import Navbar from '../../components/Shared/Navbar/Navbar'
import Signup from '../../components/Signup/Signup'
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (session?.user) {
        return {
            redirect: {
                destination: '/profile',
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
}

export default function Page({ session }) {
    return (
        <div>
            <Head>
                <title>Garden Shop</title>
                <meta name="description" content="e-commerce" />
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                <link rel="icon" href="https://i.pinimg.com/736x/70/c0/ba/70c0baafea00b9b892d084e7202d0c61.jpg" />
            </Head>
            <main className=''>
                <Navbar />
                <Signup />
                <Footer />
            </main>
        </div>
    )
}

