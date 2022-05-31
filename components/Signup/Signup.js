import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormBox } from '../Login/Login';
import Button from '../Shared/Button';

const Signup = () => {
    const router = useRouter();

    const inputFeilds = [
        {
            id: 0,
            name: 'user_name',
            placeholder: "UserName",
            title: 'User Name',
            type: 'email'
        },
        {
            id: 1,
            name: 'password',
            placeholder: "Password",
            title: 'Password',
            type: 'password'
        },
        {
            id: 1,
            name: 'confirm_password',
            placeholder: "Confirm  Password",
            title: 'Confirm  Password',
            type: 'password'
        }
    ]
    return (
        <div className='bg-no-repeat bg-cover bg-right bg-[url("https://cdn.shopify.com/s/files/1/0033/7956/0537/files/New_Project_9.jpg?v=1570870688")]'>
            <div className="container mx-auto">
                <div className='py-20'>
                    <div className="w-10/12 mx-auto md:mx-0 md:w-7/12 lg:w-5/12 shadow-lg">
                        <div className='w-full bg-white p-10'>
                            <p className='text-4xl font-thin  text-center mb-10'>
                                <span>Sign Up </span>
                                <span className='text-base font-normal cursor-pointer' onClick={() => router.push('login')}> Log in</span>
                            </p>
                            <FormBox inputFeilds={inputFeilds} />
                            <p className="text-center text-gray-500 text-xs mt-5">
                                &copy;2020 Acme Corp. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
