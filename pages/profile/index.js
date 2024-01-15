import { useEffect, useState } from 'react';
import { FaHome, FaKey, FaUserAlt } from 'react-icons/fa';
import Account from '../../components/Shared/Profile/Account';
import Navbar from '../../components/Shared/Navbar/Navbar';
import Footer from '../../components/Shared/Footer/Footer';
import ChangePassword from '../../components/Shared/Profile/ChangePassword';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';


export default function Profile() {
    const [selectList, setSelectList] = useState('account')
    const {data: session} = useSession()
    const router = useRouter()

    useEffect(() => {
        if(!session?.user?.email) {
            router.push('/login')
        }
    }, [session?.user?.email])
    return (
        <>
            {
                !session?.user?.email ? 'Redirecting...' :
                <div>
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
                                </div>
                            </div>
                            {
                                selectList === 'account' && <Account css="md:w-3/5 lg:3/4 px-5 md:px-0 md:pl-8" />
                            }
                            {
                                selectList === 'password' && <ChangePassword css="md:w-3/5 lg:3/4 px-5 md:px-0 md:pl-8" />
                            }
                            {
                                selectList === 'security' && <ChangePassword css="md:w-3/5 lg:3/4 px-5 md:px-0 md:pl-8 opacity-0 pointer-events-none hidden md:block" />
                            }
                        </div>
                    </div>
                    <Footer />
                </div>
            }
        </>
    )
}