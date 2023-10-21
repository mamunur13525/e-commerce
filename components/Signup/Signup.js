import { useRouter } from 'next/router';
import React from 'react';
import { FormBox } from '../Login/Login';

const Signup = () => {
    const router = useRouter();
    const inputFeilds = [
        {
            id: 10,
            name: 'name',
            placeholder: "Fullname",
            title: 'Full Name',
            type: 'text'
        },
        {
            id: 0,
            name: 'email',
            placeholder: "Email",
            title: 'Email',
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
            id: 2,
            name: 'confirm_password',
            placeholder: "Confirm  Password",
            title: 'Confirm  Password',
            type: 'password'
        }
    ]
    return (
        <div className='bg-no-repeat bg-cover bg-right bg-[url("https://cdn.shopify.com/s/files/1/0033/7956/0537/files/New_Project_9.jpg?v=1570870688")]'>
            <div className="container mx-auto">
                <div className='py-20 '>
                    <div className="w-[28rem]  rounded-sm mx-auto md:mx-0  shadow-lg">
                        <div className='w-full bg-white p-10'>
                            <p className='text-4xl font-thin  text-center mb-10'>
                                <span>Sign Up </span>
                                <span className='text-base text-gray-500 font-normal cursor-pointer' onClick={() => router.push('login')}> / Log in</span>
                            </p>
                            <FormBox inputFeilds={inputFeilds} submitBtn="Register" apiType="register" />
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
