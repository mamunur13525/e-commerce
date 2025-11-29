import Login from '../../components/Login/Login'
import Footer from '../../components/Shared/Footer/Footer'
import Navbar from '../../components/Shared/Navbar/Navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'


export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);
    const { callbackUrl } = context.query;

    if (session?.user) {
        // If already logged in, redirect to callback or profile
        const destination = callbackUrl && callbackUrl !== '/login' && callbackUrl !== '/signup'
            ? decodeURIComponent(callbackUrl)
            : '/profile';

        return {
            redirect: {
                destination,
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
            callbackUrl: callbackUrl || null,
        },
    };
}

export default function Page({ session, callbackUrl }) {
    console.log(session)
    return (
        <div>
            <main className=''>
                <Navbar />
                <Login callbackUrl={callbackUrl} />
                <Footer />
            </main>
        </div>
    )
}

