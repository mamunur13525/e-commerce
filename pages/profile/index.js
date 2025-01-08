import Navbar from '../../components/Shared/Navbar/Navbar';
import Footer from '../../components/Shared/Footer/Footer';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]'
import { useState } from 'react';
import { FaHome, FaKey, FaList, FaUserAlt } from 'react-icons/fa';
import Account from '../../components/Shared/Profile/Account';
import ChangePassword from '../../components/Shared/Profile/ChangePassword';
import Orders from '../../components/Shared/Profile/Orders';
import Head from 'next/head';

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session?.user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    let userData = {}

    await fetch(`${base_url}/api/user-data`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: session.user.email })
    })
        .then(res => res.json())
        .then(userResult => {
            if (!userResult.error) {
                userData = userResult
            }
        })

    return {
        props: {
            session,
            user: userData
        },
    };
}

export default function Page({ user }) {

    const [userData, setUserData] = useState(user || {})

    const [selectList, setSelectList] = useState('account')

    const pageTitleMap = {
        account: 'Account Information',
        password: 'Change Password',
        security: 'Security Settings',
        orders: 'Order History',
    };
    const pageTitle = pageTitleMap[selectList] || 'Profile';
    return (
        <div>
            <Head>
                <title>{pageTitle} - Garden Shop</title>
                <meta name="description" content={`Manage your ${pageTitle.toLowerCase()} here.`} />
            </Head>
            <Navbar />
            <div className="flex justify-center">
                <div className='md:flex md:mt-10 md:pr-3 lg:justify-center w-full lg:w-[1150px] xl:w-[1350px]'>
                    <div className='md:w-2/5 lg:w-1/4 md:border-r md:border-slate-300'>
                        <div className="flex flex-col items-center m-10 lg:m-5">
                            <img className="w-56 h-56 border rounded-full object-cover" src="https://cdn.shopify.com/s/files/1/2179/9295/files/images-choose_grande.jpg?v=1500449615" alt="Profile Picture" />
                            <h1 className="text-2xl mt-4 font-semibold">Maruf Hossain</h1>
                        </div>
                        <div>
                            <div onClick={() => setSelectList('account')} className={`flex h-12 items-center px-5 py-4 cursor-pointer ${selectList === 'account' ? 'bg-[#80b435] border-none text-white' : 'text-black border-b border-t'} `}>
                                <FaHome className='mr-3' />
                                <h2 className='text-lg'>Account</h2>
                            </div>
                            <div onClick={() => setSelectList('password')} className={`flex h-12 items-center px-5 py-4 cursor-pointer ${selectList === 'password' ? 'bg-[#80b435] border-none text-white' : 'text-black border-b'} `}>
                                <FaKey className='mr-3' />
                                <h2 className='text-lg'>Password</h2>
                            </div>
                            <div onClick={() => setSelectList('security')} className={`flex h-12 items-center px-5 py-4 cursor-pointer ${selectList === 'security' ? 'bg-[#80b435] border-none text-white' : 'text-black border-b'} `}>
                                <FaUserAlt className='mr-3' />
                                <h2 className='text-lg'>Security</h2>
                            </div>
                            {userData?.orders?.length > 0 && <div onClick={() => setSelectList('orders')} className={`flex h-12 items-center px-5 py-4 cursor-pointer ${selectList === 'orders' ? 'bg-[#80b435] border-none text-white' : 'text-black border-b'} `}>
                                <FaList className='mr-3' />
                                <h2 className='text-lg'>Orders</h2>
                            </div>}
                        </div>
                    </div>
                    {
                        selectList === 'account' && <Account setUserData={setUserData} userData={userData} css="md:w-3/5 lg:3/4 px-5 md:px-0 md:pl-8" />
                    }
                    {
                        selectList === 'password' && <ChangePassword email={userData.email} css="md:w-3/5 lg:3/4 px-5 md:px-0 md:pl-8" />
                    }
                    {
                        selectList === 'security' && <ChangePassword css="md:w-3/5 lg:3/4 px-5 md:px-0 md:pl-8 opacity-0 pointer-events-none hidden md:block" />
                    }
                    {
                        selectList === 'orders' && <Orders userData={userData} css="md:w-3/5 lg:3/4 mx-5 md:mx-0 md:pl-8 mt-10 lg:mt-0" />
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}