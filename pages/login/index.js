import Login from '../../components/Login/Login'
import Footer from '../../components/Shared/Footer/Footer'
import Navbar from '../../components/Shared/Navbar/Navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'


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

export default function Page({session}) {
    console.log(session)
    return (
        <div>
            <main className=''>
                <Navbar />
                <Login />
                <Footer />
            </main>
        </div>
    )
}

